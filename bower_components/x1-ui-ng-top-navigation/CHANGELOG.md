# Peretz Top Navigation Change Log

All notable changes to this project will be documented in this file. This project adheres to
[Semantic Versioning](http://semver.org/) and [Keep a CHANGELOG](http://keepachangelog.com/).

## [2.2.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/2.2.0) - 2016-05-10
### Added
- html support for `brand`
- `ngSanitize` module dependency
- `ui.bootstrap.dropdown` module dependency
### Changed
- styles to meet latest spec
- gulpfile structure to meet standard
- `package.json` to meet standard
- demo to reflect changes

## [2.1.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/2.1.4) - 2016-04-21
### Fixed
- Shifted badge in header

## [2.1.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/2.1.3) - 2016-03-25
### Added
- Translation: added 9 new languages

## [2.1.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/2.1.2) - 2016-03-15
### Changed
- x1-ui-ng-demo-generator bower versions

## [2.1.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/2.1.1) - 2016-03-13
### Fixed
- height bug in Safari

## [2.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/2.1.0) - 2016-03-13
### Added
- new listener `x1.ui.top-navigation.hamburger.emit` created. When this event is emitted on `$rootScope` top-nav changes hamburger btn state.
- updated demo to showcase new feature, also fixed demo controller to use `$rootScope` instead of `$scope`
- pushed tag

## [2.0.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/2.0.0) - 2016-03-11
### Added
- IBM Commerce Product Design Language 2.0
- `x1-ui-ng-demo-generator` to demo/devDependencies1
### Changed
- Bower dependencies to meet new look & feel
### Removed
- Demo UX specification and blueprint to meet new Showcase integration
- Breadcrumbs functionality

## [1.4.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/1.4.0) - 2016-03-03
### Changed
- porting build environment to Node LTS 4.3.1 which requires updating dependency packages.
- Please update your build environment, remove node_modules directory, run npm install && npm update before using this version

## [1.3.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/1.3.2) - 2016-01-21
### Added
- Media screen to stylesheet
- Component class
### Changed
- Updated bower dependencies
- Updated demo examples

## [1.3.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/1.3.1) - 2015-12-24
### Fixed
- IBM logo is too large in IE

## [1.3.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/1.3.0) - 2015-11-13
### Added
- isHamburgerActive to directive scope

### Changed
- 3rd party dependencies to latest approved version

## [1.2.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/1.2.1) - 2015-11-11
### Changed
- Demo documentation
- Prism directive files
- x1-ui-bootstrap dependency version


## [1.2.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/1.2.0) - 2015-10-19
### Fixed
- UI mirroring issues

## [1.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/1.1.0) - 2015-10-07
### Added
- isFixed to directive
- IBM logo styles


## [1.0.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/1.0.1) - 2015-10-06
### Added
- IBM logo styles


## [1.0.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/1.0.0) - 2015-09-30
### Added
- [RTC-202044](https://emmrtcapp03.emmlabs.ibm.com:9443/ccm/web/projects/ExperienceOne%20Peretz#action=com.ibm.team.workitem.viewWorkItem&id=202044) Accessibility support
- Directive scope variables: brandBadge, brandBreadcrumbClass, breadcrumbTemplateUrl.
	- Breadcrumb support
	- Brand badge support for labeling versions.
- IBM logo.
- Event to broadcast when clicking the brand

### Changed
- Bootstrap dependency version.
- Constant syntax.
- Directive scope variables: brand, brandHref, isMobile.
- Directive scope variable, hamburger, to accept boolean values.
- Directive template layout and styles.
- Internationalization variables.

### Fixed
- Unit tests


## [0.3.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/0.3.3) - 2015-09-25
### Fixed
- Include mirroring support in vendor.css


## [0.3.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/0.3.2) - 2015-09-01
### Added
- UI mirroring support


## [0.3.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/0.3.1) - 2015-08-14
### Added
- Added new attribute title-link so that users can add href through this attribute


## [0.3.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/0.3.0) - 2015-07-01
### Added
- Added support for mobile devices


## [0.2.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/0.2.3) - 2015-05-13
### Fixed
- Sonar unit-test issue.


## [0.2.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/0.2.2) - 2015-05-13
### Added
- Internationalization support for top-navigation title and demo page.


## [0.2.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/0.2.1) - 2015-05-06
### Changed
- x1-ui-bootstrap version to 2.1.0.


## [0.2.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/0.2.0) - 2015-03-12
### Changed
- x1-ui-bootstrap version to 2.0.0.


## [0.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-top-navigation/tree/0.1.0) - 2015-02-27
### Added
- Created the top navigation component with ability to display a title, custom menu items and a hamburger menu which
can be used to toggle the left navigation.