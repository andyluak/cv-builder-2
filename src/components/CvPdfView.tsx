import { TFormData } from "@/components/form";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: "24px 96px",
    fontFamily: "Roboto",
    backgroundColor: "rgb(255, 255, 255)", // oklch(1 0 0)
    color: "rgb(37, 37, 37)", // oklch(0.145 0 0)
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    marginBottom: "16px",
  },
  name: {
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 24,
    marginBottom: 8,
  },
  contactInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderTop: "2px solid rgb(156, 163, 175)", // oklch(70% 0.0148 254.12)
    borderBottom: "2px solid rgb(156, 163, 175)",
    padding: "8px 0",
    width: "100%",
  },
  contactText: {
    fontSize: 10,
    color: "rgb(142, 142, 142)", // oklch(0.556 0 0)
  },
  sectionTitle: {
    color: "rgb(142, 142, 142)", // oklch(0.556 0 0)
    fontSize: 14,
    textAlign: "center",
    marginBottom: 4,
  },
  section: {
    marginBottom: 16,
    borderBottom: "2px solid rgb(156, 163, 175)", // oklch(70% 0.0148 254.12)
    paddingBottom: 8,
  },
  experienceItem: {
    marginBottom: 32,
  },
  experienceHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  companyInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  jobTitleText: {
    fontSize: 12,
  },
  companyText: {
    fontSize: 12,
    color: "rgb(142, 142, 142)", // oklch(0.556 0 0)
  },
  dateText: {
    fontSize: 10,
    color: "rgb(142, 142, 142)", // oklch(0.556 0 0)
  },
  summaryText: {
    fontSize: 11,
    marginBottom: 8,
  },
  bulletPoint: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: 24,
    fontSize: 11,
  },
  bullet: {
    marginRight: 8,
    color: "rgb(142, 142, 142)", // oklch(0.556 0 0)
  },
  skillsText: {
    fontSize: 11,
    marginBottom: 8,
  },
});

const CVPdfView = ({ data }: { data: TFormData }) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.username}</Text>
        <Text style={styles.jobTitle}>{data.jobTitle}</Text>
      </View>

      <View style={styles.contactInfo}>
        <Text style={styles.contactText}>{data.address}</Text>
        <Text style={styles.contactText}>•</Text>
        <Text style={styles.contactText}>{data.phone}</Text>
        <Text style={styles.contactText}>•</Text>
        <Text style={styles.contactText}>{data.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.summaryText}>{data.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((exp, i) => (
          <View key={i} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <View style={styles.companyInfo}>
                <Text style={styles.jobTitleText}>{exp.jobTitle}</Text>
                <Text style={styles.companyText}>{exp.company}</Text>
              </View>
              <Text style={styles.dateText}>
                {exp.startDate} - {exp.endDate}
              </Text>
            </View>
            <Text style={styles.summaryText}>{exp.summary}</Text>
            {exp.bullets.map((bullet, j) => (
              <View key={j} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, i) => (
          <View key={i} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <View style={styles.companyInfo}>
                <Text style={styles.jobTitleText}>{edu.degree}</Text>
                <Text style={styles.companyText}>{edu.school}</Text>
              </View>
              <Text style={styles.dateText}>
                {edu.startDate} - {edu.endDate}
              </Text>
            </View>
            <Text style={styles.summaryText}>{edu.summary}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.skillsText}>{data.skills.join(", ")}</Text>
      </View>
    </Page>
  </Document>
);

export default CVPdfView;
