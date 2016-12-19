# Peretz Popover Change Log

All notable changes to this project will be documented in this file. This project adheres to
[Semantic Versioning](http://semver.org/) and [Keep a CHANGELOG](http://keepachangelog.com/).

## [2.0.9](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/2.0.9) - 2016-06-01
### Fixed
- empty href attribute in default popover content causes a state change event in the host application

## [2.0.8](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/2.0.8) - 2016-05-26
### Fixed
- menu popover is clickable.

## [2.0.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/2.0.7) - 2016-05-17
### Fixed
- Dependency injection issue within popover provider

## [2.0.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/2.0.6) - 2016-05-12
### Added
- `ui.bootstrap.popover` module dependency
### Changed
- `package.json` to meet the standard devDependencies & acquire Gitlab url
- `gulpfile.js` to meet the standard format
- `README.md` to meet the new format
### Fixed
- Accessibility checkpoints: 1.3a, 1.3f, 2.1a, 2.4e, AA2.4.7
	- list items are now identified as links

## [2.0.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/2.0.5) - 2016-04-14
### Fixed
- Issue with popover-menu class

## [2.0.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/2.0.4) - 2016-03-31
### Added
- CustomTitle property

## [2.0.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/2.0.3) - 2016-03-25
### Added
- Translation: added 9 new languages

## [2.0.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/2.0.2) - 2016-03-25
### Fixed
- Run $digest only if there are no active $$phase

## [2.0.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/2.0.1) - 2016-03-15
### Changed
- `x1-ui-ng-demo-generator` bower version

## [2.0.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/2.0.0) - 2016-03-11
### Added
- IBM Commerce Product Design Language 2.0
- `x1-ui-ng-demo-generator` to demo/devDependencies1
### Changed
- Bower dependencies to meet new look & feel
- Popover content template structure
### Removed
- Demo UX specification and blueprint to meet new Showcase integration

## [1.0.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/1.0.1) - 2016-03-12
### Changed
- updated demo for new showcase

## [1.0.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/1.0.0) - 2016-03-02
### Changed
- porting build environment to Node LTS 4.3.1 which requires updating dependency packages.
- Please update your build environment, remove node_modules directory, run npm install && npm update before using this version

## [0.3.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.3.6) - 2016-03-01
### Added
- Gulp del
### Fixed
- List group styles
### Removed
- Commented code
- Gulp clean

## [0.3.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.3.5) - 2016-02-16
### Added
- content, content-html properties

## [0.3.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.3.4) - 2016-02-02
### Fixed
- Accessibility bugs

## [0.3.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.3.3) - 2015-12-25
### Fixed
- Issue with outside click in IE

## [0.3.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.3.2) - 2015-12-14
### Fixed
- Issue with unbinding "resize" event
### Changed
- Specifying the exact versions of the dependencies in bower.json, avoiding using "*" or "~1.0.1" to specify dependencies

## [0.3.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.3.1) - 2015-12-09
### Fixed
- Issue with wrong css class name of popover root element
- Issue with using not working method

## [0.3.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.3.0) - 2015-12-03
### Added
- [RTC-202055](https://emmrtcapp03.emmlabs.ibm.com:9443/ccm/web/projects/ExperienceOne%20Peretz#action=com.ibm.team.workitem.viewWorkItem&id=202055) Accessibility support
- PrismJS to demo
- Globalization support
- Popover controller
### Changed
- Demo directory structure
- Updated bower dependencies

## [0.2.17](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.17) - 2015-11-27
### Fixed
- Rendering popovers twice
- Wrong placing popovers on window resizing

## [0.2.16](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.16) - 2015-11-09
### Fixed
- RTC-45327 - Header defect: help menu width

## [0.2.15](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.15) - 2015-11-04
### Fixed
- DA-RTC-45182- Fixing layout of list items

## [0.2.14](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.14) - 2015-10-29
### Fixed
- The Alignment of the dropdown icon in RTL layout

## [0.2.13](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.13) - 2015-10-20
### Removed
- Unnecessary handler on window resize

## [0.2.12](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.12) - 2015-10-16
### Fixed
- Cutting off the popovers if they are placed beyond the screen

## [0.2.11](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.11) - 2015-10-06
### Fixed
- Outside click

## [0.2.10](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.10) - 2015-09-30
### Fixed
- Issue with showing tooltip on element with scroll:auto

## [0.2.9](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.9) - 2015-09-26
### Added
- UI mirroring support

## [0.2.8](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.8) - 2015-09-24
### Added
- className feature

## [0.2.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.7) - 2015-09-22
### Fixed
- Emit "x1.ui.popover.closed" only when the popover "x" icon is clicked. Not necessary in other cases.

## [0.2.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.6) - 2015-09-17
### Added
- New feature: multiple popover

## [0.2.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.5) - 2015-09-03
### Fixed
- position: "top", "left", "right"

## [0.2.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.4) - 2015-08-14
### Fixed
- Emitting x1.ui.popover.closed event when popover is closed

## [0.2.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.3) - 2015-06-22
### Fixed
- Added possibility to define if popover must be closed after clicking outside it or after
pressing escape button.

## [0.2.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.2) - 2015-05-11
### Fixed
- Glyphicon class name update.
- Popover title padding.

## [0.2.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.1) - 2015-05-06
### Changed
- Updated x1-ui-bootstrap to 2.1.0.

## [0.2.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.2.0) - 2015-03-12
### Changed
- Updated x1-ui-bootstrap to 2.0.0.

## [0.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-popover/tree/0.1.0) - 2015-03-11
### Added
- Popover component initiation.