# Peretz Modal Change Log

All notable changes to this project will be documented in this file. This project adheres to
[Semantic Versioning](http://semver.org/) and [Keep a CHANGELOG](http://keepachangelog.com/).

## [2.0.3](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F2.0.3) - 2016-04-21
### Fixed
- Some modals are missing styles when x1-ui-modal class is not provided

## [2.0.2](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F2.0.2) - 2016-03-25
### Added
- Translation: added 9 new languages

## [2.0.1](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F2.0.1) - 2016-03-15
### Changed
- `x1-ui-ng-demo-generator` bower version

## [2.0.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F2.0.0) - 2016-03-11
### Added
- IBM Commerce Product Design Language 2.0
- `x1-ui-ng-demo-generator` to demo/devDependencies1
- modal.scss and modal.mixins.scss
- Default windowClass: "x1-ui-modal"
### Changed
- Bower dependencies to meet new look & feel
- Demo examples layout
### Removed
- Demo UX specification and blueprint to meet new Showcase integration
- Success modal from UX

## [1.0.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F1.0.0) - 2016-03-02
### Changed
- porting build environment to Node LTS 4.3.1 which requires updating dependency packages.
- Please update your build environment, remove node_modules directory, run npm install && npm update before using this version

## [0.5.6](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.5.6) - 2016-02-16
### Added
- Possibility to add other buttons except to "ok" and "cancel"

## [0.5.5](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.5.5) - 2016-01-26
### Changed
- Bootstrap dependency version to final modal animation

## [0.5.4](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.5.4) - 2016-01-26
### Changed
- Bootstrap dependency version

## [0.5.3](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.5.3) - 2016-01-25
### Added
- Accessibility to modal close button
### Fixed
- Header content to be in an accessible order

## [0.5.2](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.5.2) - 2016-01-13
### Added
- dismissAll feature

## [0.5.1](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.5.1) - 2015-12-16
### Fixed
- Inappropriate button label in Warning modal

## [0.5.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.5.0) - 2015-11-19
### Added
- [RTC-202052](https://emmrtcapp03.emmlabs.ibm.com:9443/ccm/web/projects/ExperienceOne%20Peretz#action=com.ibm.team.workitem.viewWorkItem&id=202052) - Accessibility support
- PrismJS to demo
### Changed
- Updated bower dependencies
- Demo directory structure
- Renamed default-template.html to modal.default.html

## [0.4.3](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.4.3) - 2015-09-26
### Added
- UI mirroring support

## [0.4.2](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.4.2) - 2015-09-17
### Added
- closed parameter so we can check to see if close button was selected while using modal in other applications

## [0.4.1](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.4.1) - 2015-06-11
### Fixed
- Unit-tests
- Increment of property "window-class"

## [0.4.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.4.0) - 2015-06-10
### Fixed
- Have x1Modal use the original configuration object passed in by the user for its internal options, settings, and
data so it can dynamically pick up changes (like enabling or disabling the action button, changing data presented, etc.)

## [0.3.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.3.0) - 2015-06-08
### Added
- .btn-sm class to buttons in modal footer
### Changed
- Updated x1-ui-bootstrap to version 2.4.0.
### Fixed
- Default template path and layout
### Removed
- _modal.scss_

## [0.2.5](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.2.5) - 2015-05-18
### Added
- Added a default template to make it easy for a user to display a quick modal by passing in nothing more than a
title and text to display. Should be useful for generic error or simple informational messages.

## [0.2.4](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.2.4) - 2015-05-11
### Added
- Added support for Angular-Translate. Values passed in from the options object will be treated as translation keys. If
 no matching value is found in a translation bundle, the key passed in from the options object will be displayed.

## [0.2.3](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.2.3) - 2015-05-06
### Changed
- Updated x1-ui-bootstrap to version 2.1.0.

## [0.2.2](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.2.2) - 2015-05-06
### Added
- new type of modal: "confirmation"


## [0.2.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.2.0) - 2015-03-12
### Changed
- Updated x1-ui-bootstrap to version 2.0.0.

## [0.1.0](http://stash.xtify.com/projects/X1-UI/repos/x1-ui-ng-modal/browse?at=refs%2Ftags%2F0.1.0) - 2015-03-11
### Added
- Modal component initiation.