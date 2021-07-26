import React from 'react';
// import RECIPEKOREA from "../../assets/fonts/RECIPEKOREA.ttf"
// import NotoSans from "../../assets/fonts/NotoSans-Regular.ttf"
import 한글틀고딕 from "../../assets/fonts/한글틀고딕.ttf"
import {Document, Font, Page, StyleSheet, Text, View} from '@react-pdf/renderer';

// Font.register({
//     family: 'Noto Sans KR',
//     format: "opentype",
//     fontWeight: 'normal',
//     src: NotoSansKR
// });

Font.register({
    // fontFamily: 'Noto Sans KR',
    family: 'Noto Sans KR',
    format: "truetype",
    // src: "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf"
    src: 한글틀고딕
});

// Font.register({
//     family: 'NanumGothic',
//     format: "truetype",
//     src: NanumGothic
// });

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        '@media max-width: 400': {
            flexDirection: 'column',
        },
        fontFamily: "Noto Sans KR"
    },
    title: {
        margin: 20,
        fontSize: 15,
        textAlign: 'left',
        textTransform: 'uppercase',
        fontFamily: 'Noto Sans KR',
    },
    text: {
        width: '60%',
        fontSize: 10,
        margin: 10,
        fontFamily: 'Noto Sans KR',
        textAlign: 'justify',
    },
    image: {
        marginBottom: 10,
    },
    leftColumn: {
        flexDirection: 'column',
        width: 170,
        paddingTop: 30,
        paddingRight: 15,
        '@media max-width: 400': {
            width: '100%',
            paddingRight: 0,
        },
        '@media orientation: landscape': {
            width: 200,
        },
    },
    footer: {
        fontSize: 12,
        // fontFamily: 'Lato Bold',
        textAlign: 'center',
        marginTop: 25,
        paddingTop: 10,
        borderWidth: 3,
        borderColor: 'gray',
        borderStyle: 'dashed',
        '@media orientation: landscape': {
            marginTop: 10,
        },
    },
});

class ResumeDocument extends React.Component {

    render() {
        console.log('ResumeDocument:', this.props)
        return (
            <Document>
                <Page style={styles.page}>
                    <View style={styles.container}>
                        <View style={styles.text}>
                            {/* 기본사항 */}
                            <Text style={styles.title}> 기본사항 </Text>
                            <Text>{this.props.resume.resume_title}</Text>
                            <Text>{this.props.resume.resume_phone}</Text>
                            <Text>{this.props.resume.resume_username}</Text>
                            {/* 경력사항 */}
                            <Text style={styles.title}> 경력사항 </Text>
                            {this.props.resume.careers
                                ? this.props.resume.careers.map((a, index) => (
                                        <>
                                            <Text>{index+1}. {a.career_start}  {a.career_end}</Text>
                                            <Text>{a.career_company} / {a.career_dpt_name}</Text>
                                            <Text>{a.career_work_role}</Text>
                                            <Text>{' '}</Text>
                                        </>
                                    )
                                ) : ""}
                            {/*학력사항 */}
                            <Text style={styles.title}> 학력사항 </Text>
                            {this.props.resume.educations
                                ? this.props.resume.educations.map((a, index) => (
                                        <>
                                            <Text>{index+1}. {a.school_code}</Text>
                                            <Text>{a.education_start}</Text>
                                            <Text>{a.education_end}</Text>
                                            <Text>{a.major_detail}</Text>
                                            <Text>{' '}</Text>
                                        </>
                                    )
                                ) : ""}
                        </View>
                    </View>
                    <Text style={styles.footer}>created by CHAEGONG </Text>
                </Page>
            </Document>
        )
    }
}

export default ResumeDocument;
