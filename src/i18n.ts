import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Example translations. Add more languages and keys as needed.
const resources = {
    en: {
        translation: {
            chooseLanguage: "Choose Language",
            testResults: "Test Results",
            testCompletedOn: "Test completed on {{date}} at {{time}}",
            yourVisualAcuityScore: "Your Visual Acuity Score",
            perfectVision: "Perfect vision",
            goodVision: "Good vision",
            needsImprovement: "Needs improvement",
            attentionRate: "Attention Rate",
            gazeStability: "Gaze Stability",
            testInsights: "Test Insights",
            excellentAttention: "Excellent attention and response accuracy",
            slightDrift: "Slight attention drift detected",
            retakeTest: "Consider retaking the test for better accuracy",
            saveReport: "Save Report",
            continueToAdvancedTest: "Continue to Advanced Test",
            languageNames: {
                en: "English",
                ar: "Arabic",
                es: "Spanish",
                zh: "Chinese",
                pt: "Portuguese",
                hi: "Hindi"
            }
        }
    },
    ar: {
        translation: {
            chooseLanguage: "اختر اللغة",
            testResults: "نتائج الاختبار",
            testCompletedOn: "تم الانتهاء من الاختبار في {{date}} الساعة {{time}}",
            yourVisualAcuityScore: "درجة حدة البصر الخاصة بك",
            perfectVision: "رؤية مثالية",
            goodVision: "رؤية جيدة",
            needsImprovement: "تحتاج إلى تحسين",
            attentionRate: "معدل الانتباه",
            gazeStability: "ثبات النظرة",
            testInsights: "رؤى الاختبار",
            excellentAttention: "انتباه ودقة استجابة ممتازة",
            slightDrift: "تم اكتشاف انحراف بسيط في الانتباه",
            retakeTest: "يرجى إعادة الاختبار لتحسين الدقة",
            saveReport: "حفظ التقرير",
            continueToAdvancedTest: "الانتقال للاختبار المتقدم",
            languageNames: {
                en: "الإنجليزية",
                ar: "العربية",
                es: "الإسبانية",
                zh: "الصينية",
                pt: "البرتغالية",
                hi: "الهندية"
            }
        }
    }
    // Add more languages here...
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem("selectedLanguageCode") || "en", // Default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false, // React already escapes
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;