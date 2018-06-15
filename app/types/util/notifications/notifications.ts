
enum NotificationSeverity {
    Unknown = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4
}

interface Notification {
    readonly severity: NotificationSeverity,
    readonly message: string
    readonly notificationData: object | undefined
}

export { Notification, NotificationSeverity }