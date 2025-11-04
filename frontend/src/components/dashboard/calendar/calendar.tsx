import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import styles from "./dashboard-calendar.module.css"

interface DashboardCalendarProps {
  currentDate: Date
}

export default function DashboardCalendar({ currentDate }: DashboardCalendarProps) {
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const renderCalendar = (date: Date) => {
    const daysInMonth = getDaysInMonth(date)
    const firstDay = getFirstDayOfMonth(date)
    const monthName = date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

    const cells = []

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      cells.push(
        <div key={`empty-${i}`} className={styles.emptyCell}>
          {date.getMonth() === 0
            ? getDaysInMonth(new Date(date.getFullYear() - 1, 11)) - firstDay + i + 1
            : getDaysInMonth(new Date(date.getFullYear(), date.getMonth() - 1)) - firstDay + i + 1}
        </div>,
      )
    }

    // Calendar days
    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentDay =
        i === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()

      cells.push(
        <div key={`day-${i}`} className={`${styles.dayCell} ${isCurrentDay ? styles.currentDay : ""}`}>
          {i}
        </div>,
      )
    }

    return (
      <div className={styles.monthContainer}>
        <h3 className={styles.monthTitle}>{monthName}</h3>
        <div className={styles.daysHeader}>
          {days.map((day) => (
            <div key={day} className={styles.dayHeader}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.daysGrid}>{cells}</div>
      </div>
    )
  }

  const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
  const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <Button variant="ghost" size="icon" className={styles.navButton}>
          <ChevronLeft size={16} />
        </Button>
        <Button variant="ghost" size="icon" className={styles.navButton}>
          <ChevronRight size={16} />
        </Button>
      </div>

      <div className={styles.months}>
        {currentDate.getDate() > 15 && currentDate.getMonth() === 10 ? (
          <>
            {renderCalendar(currentDate)}
            {renderCalendar(nextMonth)}
          </>
        ) : (
          <>
            {renderCalendar(prevMonth)}
            {renderCalendar(currentDate)}
          </>
        )}
      </div>
    </div>
  )
}
