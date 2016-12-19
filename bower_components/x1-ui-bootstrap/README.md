# Peretz Bootstrap (v2.10.0)
_Note: This component includes Bootstrap v3.3.4 Sass Package [http://getbootstrap.com](http://getbootstrap.com)_

***

[X1 UI Bootstrap (Peretz)](http://dev.x1showcase.emmlabs.ibm.com) is the ultimate framework
which implements the layers of Peretz as defined in the Peretz style guide by mapping and
extending Twitter Bootstrap.

The Look:

- Color
- Iconography
- Typography
- Layout

## Installation Instructions:

If you want to use X1 UI Bootstrap in your project, create a bower registry file called _.bowerrc_
in your project root and add this config to it to point to our private bower registry.

	{
		"registry": "http://x1showcase.emmlabs.ibm.com:5678"
	}

Execute this command in your project root to install X1 UI Bootstrap.

	bower install x1-ui-bootstrap

Include one of the paths below in your index file. Remember, you don't have to include Twitter Bootstrap in this case.

- bower_components/x1-ui-bootstrap/dist/x1-ui-bootstrap.css
- bower_components/x1-ui-bootstrap/dist/x1-ui-bootstrap.min.css

In order to access the demo pages locally open
http://localhost/your-project-name/bower_components/x1-ui-bootstrap/dist/demo/#/css
assuming you have your project in the root directory of your favorite HTTP server.

### Optional:

You can also import _x1-ui-sass-tools.scss_ in your Sass files to get access to Peretz Bootstrap
and Core Bootstrap colors, variables, and mixins.

	@import "bower_components/x1-ui-bootstrap/app/src/x1-ui-sass-tools";

To access [Bootstrap's JavaScript Components](http://getbootstrap.com/javascript/), include one
of the paths below in your index file.

    - bower_components/x1-ui-bootstrap/app/src/bootstrap/bootstrap.js
    - bower_components/x1-ui-bootstrap/app/src/bootstrap/bootstrap.min.js

## Contribution Instructions:

If you are interested in contributing to this project:

1. Fork the x1-ui-bootstrap repository
2. Make changes to your fork, commit and push the changes to your fork
3. Submit a pull request from your fork to the master branch of x1-ui-bootstrap (2 approvals mandatory to merge)

### Build commands:

In order to build and watch files as you modify, run:

```sh
$ gulp
```

In order to build files, run:

```sh
$ gulp build
```

In order to clean your build, run:

```sh
$ gulp clean
```

### Approval Guidelines:

1. Make sure you update the demo pages in the _app/demo_ folder whenever you change the _app/src_
files
