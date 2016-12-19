# Peretz Tooltip Change Log

All notable changes to this project will be documented in this file. This project adheres to
[Semantic Versioning](http://semver.org/) and [Keep a CHANGELOG](http://keepachangelog.com/).

## [2.0.12](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/2.0.12) - 2016-05-16
### Fix
- Dependencies weren't properly injected when declared within services

## [2.0.11](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/2.0.11) - 2016-05-11
### Added
- `ui.bootstrap.tooltip` to module dependencies
### Changed
- `package.json` to meet guidelines
- `gulpfile.js` to meet guidelines
- demo files to meet guidelines

## [2.0.10](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/2.0.10) - 2016-05-10
### Fix
- Nullpointer error on console on removeAttribute() function

## [2.0.9](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/2.0.9) - 2016-05-06
### Fix
- Tooltips were not displayed if *contentTemplate* option was used

## [2.0.8](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/2.0.8) - 2016-04-29
### Fix
- Tooltip was displayed in a wrong position when parent block was resized

## [2.0.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/2.0.7) - 2016-04-22
### Fix
- HTML content was not working

## [2.0.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/2.0.6) - 2016-04-15
### Added
- "outsideClick" feature

## [2.0.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/2.0.5) - 2016-04-12
### Fixed
- Shifted arrow position in left tooltip

## [2.0.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/2.0.4) - 2016-03-31
### Fixed
- scroll for popover content

## [2.0.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/2.0.3) - 2016-03-25
### Fixed
- Translation: added 9 new languages

## [2.0.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/2.0.2) - 2016-03-23
### Fixed
- Initial positioning restore on back to full screen

## [2.0.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/2.0.1) - 2016-03-15
### Changed
- x1-ui-ng-demo-generator bower versions

## [2.0.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/2.0.0) - 2016-03-11
### Added
- IBM Commerce Product Design Language 2.0
- x1-ui-tooltip class to directive
- `x1-ui-ng-demo-generator` to demo/devDependencies1
### Changed
- Bower dependencies to meet new look & feel
### Removed
- Demo UX specification and blueprint to meet new Showcase integration

## [1.0.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/1.0.1) - 2016-03-04
### Fixed
- Positioning of top-placed tooltip with body container

## [1.0.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/1.0.0) - 2016-03-03
### Changed
- porting build environment to Node LTS 4.3.1 which requires updating dependency packages.
- Please update your build environment, remove node_modules directory, run npm install && npm update before using this version

## [0.3.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.3.3) - 2016-02-18
### Fixed
- Positioning of left-placed tooltip

## [0.3.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.3.2) - 2016-02-03
### Changed
- Bower dependencies
- Demo code

## [0.3.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.3.1) - 2016-01-20
### Fixed
- Issue with improper tooltip position in Internet Explorer [RTC-47290]

## [0.3.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.3.0) - 2015-12-09
### Added
- [RTC-211328](https://emmrtcapp03.emmlabs.ibm.com:9443/ccm/web/projects/ExperienceOne%20Peretz#action=com.ibm.team.workitem.viewWorkItem&id=211328) Accessibility support
- Globalization support
- PrismJS to demo
### Changed
- Renamed dimensions.service.js to tooltip.service.js

## [0.2.12](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.2.12) - 2015-12-8
### Fixed
- Issues related to dynamic tooltip content

## [0.2.11](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.2.11) - 2015-11-30
### Fixed
- Issues related to tooltip placement

## [0.2.10](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.2.10) - 2015-11-19
### Fixed
- Issue with not setting "prefixClass" option
- Issue with tooltip wrong aligning when container is set to "body"

## [0.2.9](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.2.9) - 2015-11-02
### Fixed
- Issue with tooltip wrong aligning when it goes beyond the right edge of the screen

## [0.2.8](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.2.8) - 2015-10-18
### Fixed
- Issue with mirrored tooltip

## [0.2.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.2.7) - 2015-10-13
### Fixed
- Issue related to popover cutting

## [0.2.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.2.6) - 2015-09-30
### Fixed
- Issue with showing tooltip on element with scroll:auto

## [0.2.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.2.5) - 2015-09-24
### Fixed
- Include mirroring support in vendor.css

## [0.2.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.2.4) - 2015-09-01
### Added
- UI mirroring support

## [0.2.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.2.3) - 2015-05-06
### Changed
- Updated x1-ui-bootstrap to v.2.1.0.

## [0.2.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.2.2) - 2015-03-20
### Changed
- Corrected versionin number discrepancies across files.

## [0.2.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.2.1) - 2015-03-20
### Changed
- Made tooltip background color match UX Blueprint.

## [0.2.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.2.0) - 2015-03-12
### Changed
- Updated x1-ui-bootstrap to v.2.0.0.

## [0.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tooltip/tree/0.1.0) - 2015-03-11
### Added
- Created the tooltip component that allows you to easily show tooltips on any element.