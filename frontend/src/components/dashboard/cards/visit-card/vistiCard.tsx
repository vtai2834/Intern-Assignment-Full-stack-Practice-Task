import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import "./visitCard.css"

interface Contact {
  name: string
  count: number
}

interface ContactCardProps {
  title: string
  contacts: Contact[]
}

export default function ContactCard({ title, contacts }: ContactCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="title">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="contactList">
          {contacts.map((contact, idx) => (
            <div key={idx} className="contactItem">
              <div className="contactIcon">🎯</div>
              <span className="contactName">{contact.name}</span>
              <span className="contactCount">{contact.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
