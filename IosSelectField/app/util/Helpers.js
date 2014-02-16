/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.util.Helpers', {
  statics: {
    convertServerDateToDate: function(serverDate) {
      var date = null;
      if (serverDate && serverDate.indexOf('-') >= 0) {
        // yyyy-mm-dd
        var year = serverDate.substr(0, 4);
        var month = Number(serverDate.substr(5, 2)) - 1;
        var day = serverDate.substr(8, 2);

        date = new Date();
        date.setYear(year);
        date.setMonth(month);
        date.setDate(day);
        date.setHours(0, 0, 0, 0);
      }
      else if (serverDate) {
        // mm/dd/yyyy hh:MM A
        // I'm only taking the date, ignore time
        var year = serverDate.substr(6, 4);
        var month = Number(serverDate.substr(0, 2)) - 1;
        var day = serverDate.substr(3, 2);

        date = new Date();
        date.setYear(year);
        date.setMonth(month);
        date.setDate(day);
        date.setHours(0, 0, 0, 0);
      }
      return date;
    },

    convertDateToServerDate: function(dateString) {
      var returnDateString;
      if (dateString) {
        returnDateString = Ext.util.Format.date(dateString, 'Y-m-d');
      }
      return returnDateString;
    },

    trimUpString: function(value) {
      if (value) {
        return value.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
      }
    },

    formatClaimantName: function(nameString){
      // flatten case
      var name = nameString;
      name = name.toLowerCase();

      // uppercase first name

      // insert space between first & last name

    },

    defaultZeroNumber: function(value) {
      if(value !== undefined) {
        return Number(value);
      }
      else {
        return 0;
      }
    },

    convertToCurrency: function(currencyNumber) {
      // Thank you http://www.mredkj.com/javascript/nfbasic.html
      currencyNumber =  '' + Ext.Number.toFixed(currencyNumber, 2);
      x = currencyNumber.split('.');
      x1 = x[0];
      x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return '$' + x1 + x2;
    },

    convertToPhone: function(phoneString) {
      if (phoneString && phoneString.trim()) {
        var phoneString = phoneString.trim();
        var resultingPhone = '';
        if (phoneString.length == 10) {
          resultingPhone = Ext.util.Format.format('({0}) {1}-{2}', phoneString.substr(0, 3), phoneString.substr(3, 3), phoneString.substr(6));
        }
        else if (phoneString.length == 7) {
          resultingPhone = Ext.util.Format.format('{1}-{2}', phoneString.substr(0, 3), phoneString.substr(3));
        }
        else {
          // Fail to just throwing back the garbage I got
          resultingPhone = phoneString;
        }

        return resultingPhone;
      }
    },

    convertToHtml: function(field) {
      field = Ext.util.Format.htmlEncode(field);
      field = field.replace(/\n/g, '<br />');
      return field;
    },

    merge: function(ignoreNulls, source) {
      if (Ext.isBoolean(ignoreNulls) && ignoreNulls) {
        var i = 2,
          ln = arguments.length,
          mergeFn = KikketerPlugins.util.Helpers.merge,
          cloneFn = Ext.clone,
          object, key, value, sourceKey;

        for (; i < ln; i++) {
          object = arguments[i];

          for (key in object) {
            value = object[key];
            if (value && value.constructor === Object) {
              sourceKey = source[key];
              if (sourceKey && sourceKey.constructor === Object) {
                mergeFn(sourceKey, value);
              }
              else {
                source[key] = cloneFn(value);
              }
            }
            else if (value) {
              source[key] = value;
            }
          }
        }

        return source;
      }
      else {
        return Ext.Object.merge.apply(this, Array.prototype.slice.call(arguments, 1));
      }
    },

    getDataMapped: function(model, inclusionKeys) {
      var mappedData = {};
      var data = model.getData();
      var mapper = model.getFields();

      Ext.Object.each(data, function(key, val, se) {
        if (mapper.map[key] && mapper.map[key]._mapping) {
          var maps = mapper.map[key]._mapping.split(' ');
          // TODO Fix multiple space items
          var lastMap = maps[maps.length - 1];
          if (!inclusionKeys || (inclusionKeys && Ext.Array.contains(inclusionKeys, key))) {
            if (mapper.map[key].config.revert) {
              // If we have a revert function, use the output of that
              mappedData[lastMap] = mapper.map[key].config.revert.call(model, val);
            }
            else {
              mappedData[lastMap] = val;
            }
          }
        }
        else if (mapper.map[key]) {
          mappedData[key] = val;
        }
      });

      return mappedData;
    },

    // Recursive function to create a nested object based on the map (with spaces)
    // Not used, yet
    // KikketerPlugins.util.Helpers.revoMapped(mappedData, maps, 0, mapper.map[key].config.revert ? mapper.map[key].config.revert.call(model, val) : val, mappedData);
    revoMapped: function revo(currentKey, maps, index, value, mappedData) {
      if (index > maps.length - 1) {
        return mappedData;
      }
      else if (index == 0) {
        currentKey = mappedData[maps[index]] = {};
        index++;
        revo(currentKey, maps, index, value, mappedData);
      }
      else if (index < maps.length - 1) {
        currentKey = currentKey[maps[index]] = {};
        index++;
        revo(currentKey, maps, index, value, mappedData);
      }
      else {
        currentKey = currentKey[maps[index]] = value;
        index++;
        revo(currentKey, maps, index, value, mappedData);
      }
    }
  }
});