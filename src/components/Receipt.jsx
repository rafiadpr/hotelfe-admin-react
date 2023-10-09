import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Svg,
  Path,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5", // Lighter background color
    padding: 10,
  },
  invoice: {
    padding: 20,
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 8,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  headerText: {
    flex: 1,
  },
  headerMainText: {
    marginLeft: 64,
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF", // Highlight color
  },
  headerSubText: {
    marginLeft: 92,
    fontSize: 12,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Darker color
  },
  sectionText: {
    fontSize: 12,
    marginBottom: 5,
    color: "#555", // Slightly darker color
  },
  footer: {
    position: "relative",
    marginTop: 20,
    paddingTop: 10,
    borderTop: "1pt solid #ccc", // Light border on top
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
  },
});

function Receipt({ data }) {
  const [reservation, setReservation] = useState(data);
  console.log(reservation);
  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.invoice}>
            <View style={styles.header}>
              <Image src="/images/logo.png" style={styles.logo} />
              <View style={styles.headerText}>
                <Text style={styles.headerMainText}>Wikusama Hotel</Text>
                <Text style={styles.headerSubText}>
                Jalan Danau Ranau
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reservation Information</Text>
              <Text style={styles.sectionText}>Nomor Pemesanan : {reservation.nomor_pemesanan}</Text>
              <Text style={styles.sectionText}>Tanggal Check In : {reservation.tgl_check_in}</Text>
              <Text style={styles.sectionText}>Tanggal Check Out : {reservation.tgl_check_out}</Text>
              <Text style={styles.sectionText}>Jumlah Kamar : {reservation.jumlah_kamar}</Text>
              <Text style={styles.sectionText}>Tipe Kamar : {reservation.id_tipe_kamar}</Text>
              {/* Add more reservation information as needed */}
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>User Information</Text>
              <Text style={styles.sectionText}>Nama Pemesan : {reservation.nama_pemesan}</Text>
              <Text style={styles.sectionText}>Email Pemesan : {reservation.email_pemesan}</Text>
              <Text style={styles.sectionText}>Tanggal Pemesanan : {reservation.tgl_pemesanan}</Text>
              {/* Add more user information as needed */}
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Contact us at: info@yourhotel.com
              </Text>
              <Text style={styles.footerText}>Phone: +123-456-7890</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default Receipt;