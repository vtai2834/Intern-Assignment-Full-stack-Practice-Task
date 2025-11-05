import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import DashboardCalendar from "@/components/dashboard/calendar/calendar"
import { useSidebar } from "@/components/ui/sidebar"
import { brandLogos } from "@/constants/brandLogos"
import { getInitials, getAvatarColor } from "@/constants/avatarUtils"
import {
  peopleChartData,
  companiesChartData,
  leadGenerationData,
  mostVisitedContacts,
  leastVisitedContacts,
  timeRanges,
} from "@/constants/homePageData"
import "./homePage.css"

export default function HomePage() {
  const [selectedRange, setSelectedRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState<"people" | "companies">("people")
  const [currentDate] = useState(new Date())
  const { state } = useSidebar()
  const sidebarWidth = state === "collapsed" ? "3rem" : "16rem"

  const chartData = selectedMetric === "people" ? peopleChartData : companiesChartData

  const chartConfig = {
    value: {
      label: "Value",
      color: selectedMetric === "people" ? "#ff6b6b" : "#2a9d90",
    },
  } satisfies ChartConfig

  return (
    <>
      {/* Time Range Selector - Outside container */}
      <div 
        className="timeRangeSelector"
        style={{ left: sidebarWidth }}
      >
        <div className="timeRangeButtons">
          {timeRanges.map((range) => (
            <button
              key={range}
              className={`timeRangeButton ${selectedRange === range ? "active" : ""}`}
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
        <DashboardCalendar currentDate={currentDate} />
      </div>

      <div className="container">
        {/* Lead Generation Card */}
        <Card className="leadCard">
          <CardHeader>
            <div className="cardHeader">
              <div className="cardHeaderCenter">
                <CardTitle className="cardTitle">Lead generation</CardTitle>
                <p className="subtitle">New contacts added to the pool.</p>
              </div>
              <div className="metricsContainer">
                <div className="metricsTabs">
                  <button
                    className={`metricTab ${selectedMetric === "people" ? "active" : ""}`}
                    onClick={() => setSelectedMetric("people")}
                  >
                    <span className="metricTabLabel">People</span>
                    <span className="metricTabValue">{leadGenerationData.people}</span>
                  </button>
                  <button
                    className={`metricTab ${selectedMetric === "companies" ? "active" : ""}`}
                    onClick={() => setSelectedMetric("companies")}
                  >
                    <span className="metricTabLabel">Companies</span>
                    <span className="metricTabValue">{leadGenerationData.companies}</span>
                  </button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Bar Chart */}
            <ChartContainer config={chartConfig} id="lead-generation-chart" className="min-h-[200px] w-full">
              <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <Bar dataKey="value" fill="var(--color-value)" radius={4} barSize={50} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Contact Cards */}
        <div className="contactsGrid">
          <Card>
            <CardHeader>
              <CardTitle className="cardTitle">Most visited contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="contactsList">
                {mostVisitedContacts.map((contact, idx) => (
                  <div key={idx} className="contactItem">
                    {contact.type === "brand" ? (
                      <div className="contactIcon">
                        {brandLogos[contact.brand]({ width: 24, height: 24 })}
                      </div>
                    ) : (
                      <div
                        className="contactIcon"
                        style={{
                          backgroundColor: getAvatarColor(contact.name),
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.6rem",
                          fontWeight: 600,
                        }}
                      >
                        {getInitials(contact.name)}
                      </div>
                    )}
                    <span className="contactName">{contact.name}</span>
                    <span className="visitCount">{contact.visits}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="cardTitle">Least visited contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="contactsList">
                {leastVisitedContacts.map((contact, idx) => (
                  <div key={idx} className="contactItem">
                    {contact.type === "brand" ? (
                      <div className="contactIcon">
                        {brandLogos[contact.brand]({ width: 24, height: 24 })}
                      </div>
                    ) : (
                      <div
                        className="contactIcon"
                        style={{
                          backgroundColor: getAvatarColor(contact.name),
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.6rem",
                          fontWeight: 600,
                        }}
                      >
                        {getInitials(contact.name)}
                      </div>
                    )}
                    <span className="contactName">{contact.name}</span>
                    <span className="visitCount">{contact.visits}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
