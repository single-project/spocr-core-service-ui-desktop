# SpocrCoreServiceUiDesktop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Project struct rules

* app/shared - This is the module where I keep small stuff that every other module will need. I have 3 submodules there directives, components and pipes, just to keep things organized a little better. Examples: filesize.pipe, click-outside.directive, offline-status.component...
* app/public - In this module I keep public routes and top-level components. Examples: about.component, contact.component, app-toolbar.component
* app/core - Services that app needs (and cannot work without) go here. Examples: ui.service,  auth.service, auth.guard, data.service, workers.service....
* app/protected - Similar to public, only for authorized users. This module has protected routes and top-level components. Examples: user-profile.component, dashboard.component, dashboard-sidebar.component...
* app/features - This is the module where app functionalities are. They are organized in several submodules. If you app plays music, this is where player, playlist, favorites submodules would go. If you look at the @angular/material2 this would be an equivalent to their MaterialModule and many submodules, like MdIconModule, MdSidenavModule etc.

General advice would be:

- organize features by functionality, not by pages
- keep similar routes in their own module (good for lazy loading)
- services that app needs to function go to core
- things you import more than once (or twice) are probably good for shared
