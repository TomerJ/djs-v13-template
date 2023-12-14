export enum LogLevel {
    // For debugging things, ideally shouldn't be used in a production environment
    Debug = 0,

    // Information such as starting up, shutting down, etc.
    Info = 1,

    // Indicates that something was successful, behaves identically to "info", except in green.
    Success = 2,

    // Behaves identically to "info", except styled in orange to indicate a warning
    Warning = 3,

    // Indicates an error, but handled
    Error = 4,

    // Will exit the process and output in purple.
    Critical = 5,
}
