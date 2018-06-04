# UI App for Import/Export


### Installation

This project requires the following AWS resources

 1) MySQL protocol Amazon RDS instance (can be either MySQL or MySQL-compatible Aurora)
 2) AWS Compute instance for the Node.js "app"
 2) Lambda access to call parts of the ETL pipeline

### Project Layout

The app is separated first by business task (e.g. auth, import, export) and then by functionality.

Each app component looks like the following:

```
\component
  \api         <- handlers for routes that calls into services
  \config      <- data structures to provide environment configuration
  \functions   <- shims to call cloud functions
  \repo        <- database persistence
  \service     <- complex logic called via the API
  \views       <- UI templates for display
  routes.js    <- routing for all paths in this component
```


