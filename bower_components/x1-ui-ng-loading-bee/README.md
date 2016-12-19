# Peretz Loading Bee (v2.0.0)

Peretz Loading Bee is a component built for loading animations. This loading animation tells
the user to wait while the application is loading. It should be used especially when the loading in
progress takes more than few seconds to complete, in order to keep the conversation going with the
user and make the interface feel faster and more responsive.

This component provides customizable features like:

* color
* size
* animation type

## Installation Instructions:
If you want to use Loading Bee in your project, create a bower registry file called .bowerrc in
your project root and add this config to it to point to our private bower registry.

	{
		"registry": "http://x1showcase.emmlabs.ibm.com:5678"
	}

Execute this command in your project root to install Loading Bee.

	bower install x1-ui-ng-loading-bee

Include the following paths in your index file:

* bower_components/x1-ui-ng-loading-bee/dist/x1-ui-ng-loading-bee.css or x1-ui-ng-loading-bee.min.css
* bower_components/x1-ui-ng-loading-bee/dist/x1-ui-ng-loading-bee.js or x1-ui-ng-loading-bee.min.js

In order to access the demo pages locally open
http://localhost/your-project-name/bower_components/x1-ui-ng-loading-bee/dist/demo/#/loading-bee
assuming you have your project in the root directory of your favorite HTTP server.

You can also access the demo pages at [X1 Showcase (Development)](http://dev.x1showcase.emmlabs
.ibm.com) to see how to leverage Loading Bee.

## Contribution Instructions:
If you are interested in contributing to this project:

1. Fork the x1-ui-ng-loading-bee repository
2. Make changes to your fork, commit and push the changes to your fork
3. Submit a pull request from your fork to the master branch of x1-ui-ng-loading-bee (2 approvals mandatory to merge)

### Build commands:

In order to build and watch files as you modify, run:

	gulp

In order to build files, run:

	gulp build

In order to clean your build, run:

    gulp clean


### Approval Guidelines:
1. Make sure you update the demo pages in the app/demo folder whenever you change the app/src files
