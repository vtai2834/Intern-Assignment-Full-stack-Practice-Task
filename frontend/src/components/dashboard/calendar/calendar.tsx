import { useState } from "react"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import "./calendar.css"

interface DashboardCalendarProps {
  currentDate?: Date
}

export default function DashboardCalendar({}: DashboardCalendarProps) {
  const [open, setOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date>(new Date(2025, 9, 6)) // Oct 6, 2025
  const [endDate, setEndDate] = useState<Date>(new Date(2025, 10, 5)) // Nov 5, 2025
  const [displayMonth, setDisplayMonth] = useState(new Date(2025, 9, 1)) // October 2025
  const [selectingStart, setSelectingStart] = useState(true)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
  }

  const formatDateRange = () => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateInRange = (date: Date) => {
    return date >= startDate && date <= endDate
  }


  const handleDateClick = (day: number, month: Date) => {
    const clickedDate = new Date(month.getFullYear(), month.getMonth(), day)
    
    if (selectingStart || clickedDate < startDate) {
      setStartDate(clickedDate)
      setEndDate(clickedDate)
      setSelectingStart(false)
    } else {
      setEndDate(clickedDate)
      setSelectingStart(true)
    }
  }

  const handleToday = () => {
    const today = new Date()
    setStartDate(today)
    setEndDate(today)
    setDisplayMonth(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectingStart(true)
  }

  const handleClear = () => {
    const today = new Date()
    setStartDate(today)
    setEndDate(today)
    setSelectingStart(true)
  }

  const handleApply = () => {
    setOpen(false)
  }

  const handlePrevMonth = () => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1))
  }

  const renderCalendar = (month: Date) => {
    const daysInMonth = getDaysInMonth(month)
    const firstDay = getFirstDayOfMonth(month)
    const monthName = month.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

    const cells = []

    // Empty cells for previous month
    const prevMonthDays = getDaysInMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
    for (let i = 0; i < firstDay; i++) {
      const day = prevMonthDays - firstDay + i + 1
      const date = new Date(month.getFullYear(), month.getMonth() - 1, day)
      const inRange = isDateInRange(date)
      
      cells.push(
        <div key={`empty-${i}`} className={`emptyCell ${inRange ? "inRange" : ""}`}>
          {day}
        </div>,
      )
    }

    // Calendar days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(month.getFullYear(), month.getMonth(), i)
      const inRange = isDateInRange(date)
      const isSelected = date.getTime() === startDate.getTime() || date.getTime() === endDate.getTime()

      cells.push(
        <div
          key={`day-${i}`}
          className={`dayCell ${inRange ? "inRange" : ""} ${isSelected ? "selected" : ""}`}
          onClick={() => handleDateClick(i, month)}
        >
          {i}
        </div>,
      )
    }

    // Empty cells for next month
    const remainingCells = 42 - cells.length // 6 rows * 7 days
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(month.getFullYear(), month.getMonth() + 1, i)
      const inRange = isDateInRange(date)
      
      cells.push(
        <div key={`next-${i}`} className={`emptyCell ${inRange ? "inRange" : ""}`}>
          {i}
        </div>,
      )
    }

    return (
      <div className="monthContainer">
        <div className="monthHeader">
          <Button variant="ghost" size="icon" className="navButton" onClick={handlePrevMonth}>
            <ChevronLeft size={16} />
          </Button>
          <h3 className="monthTitle">{monthName}</h3>
          <Button variant="ghost" size="icon" className="navButton" onClick={handleNextMonth}>
            <ChevronRight size={16} />
          </Button>
        </div>
        <div className="daysHeader">
          {days.map((day) => (
            <div key={day} className="dayHeader">
              {day}
            </div>
          ))}
        </div>
        <div className="daysGrid">{cells}</div>
      </div>
    )
  }

  const nextMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="calendarTrigger">
          <CalendarIcon size={16} />
          <span>{formatDateRange()}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="popoverContentCalendar" 
        align="start" 
        sideOffset={8}
      >
        <div className="calendarContainer">
          {/* Top Section */}
          <div className="topSection">
            <Button variant="ghost" size="sm" onClick={handleToday} className="topButton">
              Today
            </Button>
            <div className="dateRangeDisplay">
              {formatDateRange()}
            </div>
            <Button variant="ghost" size="sm" onClick={handleClear} className="topButton">
              Clear
            </Button>
          </div>

          {/* Calendar Section */}
          <div className="months">
            {renderCalendar(displayMonth)}
            {renderCalendar(nextMonth)}
          </div>

          {/* Bottom Section */}
          <div className="bottomSection">
            <Button onClick={handleApply} className="applyButton">
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
