# Peretz Tooltip (v2.0.12)

Peretz Tooltip allows you to easily show tooltips on any element.

## Installation Instructions:
If you want to use Peretz Tooltip in your project, create a bower registry file
called .bowerrc in your project root and add this config to it to point to our private bower registry.

	{
		"registry": "http://x1showcase.emmlabs.ibm.com:5678"
	}

Execute this command in your project root to install Peretz Tooltip.

	bower install x1-ui-ng-tooltip

In order to access the demo pages locally open
http://localhost/your-project-name/bower_components/x1-ui-ng-tooltip/dist/demo/#/tooltip assuming you have your project in the root directory of your favorite HTTP server.

You can also access the demo pages at [X1 Showcase (Development)](http://dev.x1showcase.emmlabs.ibm.com) to see how
to leverage Peretz Tooltip.

## Contribution Instructions:
If you are interested in contributing to this project:

1. Fork the x1-ui-ng-tooltip repository
2. Make changes to your fork, commit and push the changes to your fork
3. Submit a pull request from your fork to the master branch of x1-ui-ng-tooltip (2 approvals mandatory to merge)

### Build commands:

In order to build and watch files as you modify, run:

	gulp

In order to build files, run:

	gulp build

In order to clean your build, run:

    gulp clean


### Approval Guidelines:
1. Make sure you update the demo pages in the app/demo folder whenever you change the app/src files