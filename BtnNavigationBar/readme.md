### Use Case
You have a need for a Navigation View, and you push and pop items off this navigation view to leverage the fantastic fading animation that comes with it (and the built in back button). But you have a need to have buttons in the navigation view change per container you push and pop on the stack.

### Current Solution
It seems you would need to add checking logic to the Navigation View itself. Example psudo code:

    if (current container  == containerA) then
     show the buttons I know for containerA

Obviously this gets a little crazy, and we would like the containers to dictate what buttons they want to show and even possibly the events that should fire when those buttons are tapped.

### Plugin Solution
A navigation view that listens for pop and push, then reads the incoming container to see if the special "I have buttons" config exists. Then add the buttons to the nav bar and redirect any tap events back to the originating container so it can direct events accordingly.

In the end all you need to care about is the following inside your container's config:

    navBarButtons: {
      leftButton: {
        text: 'Clear'
      },
      rightButton: {
        text: 'Search'
      }
    }

The leftButton and rightButton map are exactly what you would use in a standard button. A couple things are defaulted for you, and do not overwrite the itemId of the button (it's used internally).

You will need to set up listeners for these buttons inside the current view.  The left button emits the <strong>onLeftNavButtonTapped</strong> and
the right button emits the <strong>onRightNavButtonTapped</strong> events.  These are different events than standard buttons.

An example listener:

    listeners: [
      {
        fn: 'onLeftTap',
        event: 'onLeftNavButtonTapped'
      },
      {
        fn: 'onRightTap',
        event: 'onRightNavButtonTapped'
      }
    ]

### Installation
To install this plugin, simply extract the contents of the attached zip in your project (or copy paste after you realize what it will do).
Then simply fix the Ext.define() portion of the files to match your namespace:

    Ext.define('myProject.view.components.NavView', { ... });

You can now freely use this component in your project by either extending the component or using it directly. Here's an example of extending it:

    Ext.define('myProject.view.SearchNavView', {
      extend: 'myProject.view.components.NavView',
      xtype: 'searchnavview',
      selector: 'searchnavview',

      config: {
        items: [
          {
            xtype: 'searchview',
            itemId: 'searchview'
          }
        ]
      }
    });

Here's an example of the 'searchview' and how to use the added config:

    Ext.define('myProject.view.SearchView', {

      extend: 'Ext.form.Panel',
      xtype: 'searchview',
      selector: 'searchview',

      config: {
        title: 'Search',

        navBarButtons: {
          leftButton: {
            text: 'Clear'
          },
          rightButton: {
            text: 'Search'
          }
        },

        listeners: [
          {
            fn: 'clear',
            event: 'onLeftNavButtonTapped'
          },
          {
            fn: 'search',
            event: 'onRightNavButtonTapped'
          }
        ]
      },

      search: function () {
        // This event is fired from the definition of action: 'search' in the nav bar buttons.
        Ext.Logger.verbose('caught the event');
        // Some view type logic, normally I just fire an event up to the controller
        this.fireEvent('search');
      },

      clear: function () {
        // Some clear functionality, this is also triggered because the action: 'clear' is defined in the nav buttons
      }
    });

The repository has the files you need along with the example.  I've tried to keep all the extra fluff to a minimum.

Let me know if you have any questions or suggestions. I'm hoping someday to expand it to accept a whole component instead of just a button. But for now, this served the purpose I needed.
I hope you find this at least a little useful for your future projects!