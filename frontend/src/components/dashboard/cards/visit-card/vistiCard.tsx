import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import styles from "./contact-card.module.css"

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
        <CardTitle className={styles.title}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.contactList}>
          {contacts.map((contact, idx) => (
            <div key={idx} className={styles.contactItem}>
              <div className={styles.contactIcon}>🎯</div>
              <span className={styles.contactName}>{contact.name}</span>
              <span className={styles.contactCount}>{contact.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
