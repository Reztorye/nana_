import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            intro: { title: "pibble.", subtitle: "im pibble.", action: "wash my belly.", continue: "continue" },
            nanaPage: {
                greeting: "hi, i'm <1>rullian</1>, top one kate denson saves, and i'm a nana fan, ada/becca main top one looping & drawing",
                motivosTitle: "official reasons", updated: "(updated daily)",
                motivos: [
                    "intelligence + creativity = dti queen goddess",
                    "investigator (non-paranormal, for now!)",
                    "nerd", "nath core games", "music taste", "pretty rave girl…", "tangerine",
                    "generosity", "cats", "pibbles", "jojofag in the making", "us connection",
                    "HUG TECH, SHE KNOWS EVERY HUG TECH AND DOESN'T MISS ONE", "all i wanted - paramore"
                ]
            },
            quiz: {
                questionNumber: "question {{current}} / {{total}}", next: "next", finish: "finish",
                questions: {
                    q1: "who are they going to put the chip in?",
                    q1opts: { a: "in us", b: "noiz", c: "hur hur hur hur hur hur", d: "in the aliens", e: "Arthur Morgan", f: "in the emos" },
                    q2: "is this being a skinwalker?",
                    q2opts: { a: "yes", b: "no" },
                    q3: "choose a date:",
                    q3opts: { a: "september 30, 1998", b: "september 24, 2025", c: "february 27, 2026", d: "july 19, 1995", e: "march 19, 2026" }
                }
            }
        }
    },
    pt: {
        translation: {
            intro: { title: "pibble.", subtitle: "im pibble.", action: "wash my belly.", continue: "continuar" },
            nanaPage: {
                greeting: "oi, eu sou o <1>rullian</1>, top one kate denson saves, e sou fã da nana, ada/becca main top one looping & drawing",
                motivosTitle: "motivos oficiais", updated: "(atualizado diariamente)",
                motivos: [
                    "inteligência + criatividade = dti queen goddess",
                    "investigadora (não-paranormal, por enquanto!)",
                    "nerd", "jogos nath core", "gosto musical", "pretty rave girl…", "mexirica",
                    "generosidade", "gatos", "pibbles", "jojofag em construção", "conexão noiz",
                    "HUG TECH, ELA SABE TODAS AS HUG TECHS E NÃO ERRA UMA", "all i wanted - paramore"
                ]
            },
            quiz: {
                questionNumber: "questão {{current}} / {{total}}", next: "próxima", finish: "finalizar",
                questions: {
                    q1: "eles vão botar o chip em quem?",
                    q1opts: { a: "em nós", b: "noiz", c: "hur hur hur hur hur hur", d: "nos alien", e: "Arthur Morgan", f: "nos emos" },
                    q2: "esse ser da imagem é um skinwalker?",
                    q2opts: { a: "sim", b: "não" },
                    q3: "escolha um data:",
                    q3opts: { a: "30 de setembro de 1998", b: "24 de setembro de 2025", c: "27 de fevereiro de 2026", d: "19 de julho de 1995", e: "19 de março de 2026" }
                }
            }
        }
    },
    es: {
        translation: {
            intro: { title: "pibble.", subtitle: "soy pibble.", action: "lava mi barriga.", continue: "continuar" },
            nanaPage: {
                greeting: "hola, soy <1>rullian</1>, top uno en salvamentos de kate denson, y soy fan de nana, main ada/becca top uno en looping y dibujo",
                motivosTitle: "razones oficiales", updated: "(actualizado diariamente)",
                motivos: [
                    "inteligencia + creatividad = dti reina diosa",
                    "investigadora (no paranormal, ¡por ahora!)",
                    "nerd", "juegos nath core", "gusto musical", "pretty rave girl…", "mandarina",
                    "generosidad", "gatos", "pibbles", "jojofag en proceso", "conexión nosotros",
                    "HUG TECH, ELLA CONOCE TODOS LOS HUG TECHS Y NO FALLA NINGUNO", "all i wanted - paramore"
                ]
            },
            quiz: {
                questionNumber: "pregunta {{current}} / {{total}}", next: "siguiente", finish: "finalizar",
                questions: {
                    q1: "¿a quién le van a poner el chip?",
                    q1opts: { a: "en nosotros", b: "noiz", c: "hur hur hur hur hur hur", d: "en los aliens", e: "Arthur Morgan", f: "en los emos" },
                    q2: "¿este ser de la imagen es un skinwalker?",
                    q2opts: { a: "sí", b: "no" },
                    q3: "elige una fecha:",
                    q3opts: { a: "30 de septiembre de 1998", b: "24 de septiembre de 2025", c: "27 de febrero de 2026", d: "19 de julio de 1995", e: "19 de marzo de 2026" }
                }
            }
        }
    },
    fr: {
        translation: {
            intro: { title: "pibble.", subtitle: "je suis pibble.", action: "lave mon ventre.", continue: "continuer" },
            nanaPage: {
                greeting: "salut, je suis <1>rullian</1>, numéro un des sauvetages de kate denson, et je suis fan de nana, main ada/becca numéro un en looping et dessin",
                motivosTitle: "raisons officielles", updated: "(mis à jour quotidiennement)",
                motivos: [
                    "intelligence + créativité = dti reine déesse",
                    "enquêtrice (non paranormale, pour l'instant !)",
                    "geek", "jeux nath core", "goût musical", "pretty rave girl…", "mandarine",
                    "générosité", "chats", "pibbles", "jojofag en devenir", "connexion nous",
                    "HUG TECH, ELLE CONNAÎT TOUS LES HUG TECHS ET N'EN RATE PAS UN", "all i wanted - paramore"
                ]
            },
            quiz: {
                questionNumber: "question {{current}} / {{total}}", next: "suivant", finish: "terminer",
                questions: {
                    q1: "à qui vont-ils mettre la puce ?",
                    q1opts: { a: "en nous", b: "noiz", c: "hur hur hur hur hur hur", d: "dans les aliens", e: "Arthur Morgan", f: "dans les emos" },
                    q2: "cet être est-il un skinwalker ?",
                    q2opts: { a: "oui", b: "non" },
                    q3: "choisissez une date :",
                    q3opts: { a: "30 septembre 1998", b: "24 septembre 2025", c: "27 février 2026", d: "19 juillet 1995", e: "19 mars 2026" }
                }
            }
        }
    },
    it: {
        translation: {
            intro: { title: "pibble.", subtitle: "sono pibble.", action: "lavami la pancia.", continue: "continua" },
            nanaPage: {
                greeting: "ciao, sono <1>rullian</1>, primo nei salvataggi di kate denson, e sono un fan di nana, main ada/becca primo in looping e disegno",
                motivosTitle: "motivi ufficiali", updated: "(aggiornato quotidianamente)",
                motivos: [
                    "intelligenza + creatività = dti regina dea",
                    "investigatrice (non paranormale, per ora!)",
                    "nerd", "giochi nath core", "gusti musicali", "pretty rave girl…", "mandarino",
                    "generosità", "gatti", "pibbles", "jojofag in divenire", "connessione noi",
                    "HUG TECH, LEI CONOSCE TUTTI GLI HUG TECHS E NON NE SBAGLIA UNO", "all i wanted - paramore"
                ]
            },
            quiz: {
                questionNumber: "domanda {{current}} / {{total}}", next: "avanti", finish: "fine",
                questions: {
                    q1: "a chi metteranno il chip?",
                    q1opts: { a: "in noi", b: "noiz", c: "hur hur hur hur hur hur", d: "negli alieni", e: "Arthur Morgan", f: "negli emo" },
                    q2: "questo essere è uno skinwalker?",
                    q2opts: { a: "sì", b: "no" },
                    q3: "scegli una data:",
                    q3opts: { a: "30 settembre 1998", b: "24 settembre 2025", c: "27 febbraio 2026", d: "19 luglio 1995", e: "19 marzo 2026" }
                }
            }
        }
    },
    de: {
        translation: {
            intro: { title: "pibble.", subtitle: "ich bin pibble.", action: "wasch meinen bauch.", continue: "weiter" },
            nanaPage: {
                greeting: "hallo, ich bin <1>rullian</1>, nummer eins bei kate denson rettungen, und ich bin ein nana fan, ada/becca main nummer eins in looping & zeichnen",
                motivosTitle: "offizielle gründe", updated: "(täglich aktualisiert)",
                motivos: [
                    "intelligenz + kreativität = dti königin göttin",
                    "ermittlerin (nicht paranormal, vorerst!)",
                    "nerd", "nath core spiele", "musikgeschmack", "pretty rave girl…", "mandarine",
                    "großzügigkeit", "katzen", "pibbles", "jojofag im werden", "unsere verbindung",
                    "HUG TECH, SIE KENNT JEDEN HUG TECH UND VERPASST KEINEN", "all i wanted - paramore"
                ]
            },
            quiz: {
                questionNumber: "frage {{current}} / {{total}}", next: "weiter", finish: "beenden",
                questions: {
                    q1: "wem werden sie den chip einsetzen?",
                    q1opts: { a: "in uns", b: "noiz", c: "hur hur hur hur hur hur", d: "in den aliens", e: "Arthur Morgan", f: "in den emos" },
                    q2: "ist dieses wesen ein skinwalker?",
                    q2opts: { a: "ja", b: "nein" },
                    q3: "wähle ein datum:",
                    q3opts: { a: "30. september 1998", b: "24. september 2025", c: "27. februar 2026", d: "19. juli 1995", e: "19. märz 2026" }
                }
            }
        }
    },
    ja: {
        translation: {
            intro: { title: "pibble.", subtitle: "私はpibbleです。", action: "お腹を洗って。", continue: "次へ" },
            nanaPage: {
                greeting: "こんにちは、<1>rullian</1>です。ケイト・デンソンの救助でトップ1、nanaのファンで、ada/beccaメイン、ルーピングと描画でトップ1です",
                motivosTitle: "公式な理由", updated: "(毎日更新)",
                motivos: [
                    "知性 + 創造性 = dti 女王 女神",
                    "調査員 (今のところ超常現象ではない！)",
                    "オタク", "nath core ゲーム", "音楽の趣味", "pretty rave girl…", "みかん",
                    "寛大さ", "猫", "pibbles", "ジョジョファグになりかけ", "私たちの繋がり",
                    "HUG TECH、彼女はすべてのHUG TECHを知っていて、一つも逃さない", "all i wanted - paramore"
                ]
            },
            quiz: {
                questionNumber: "質問 {{current}} / {{total}}", next: "次へ", finish: "終了",
                questions: {
                    q1: "誰にチップを入れるつもりですか？",
                    q1opts: { a: "私たちに", b: "noiz", c: "hur hur hur hur hur hur", d: "エイリアンに", e: "Arthur Morgan", f: "エモに" },
                    q2: "この生き物はスキンウォーカーですか？",
                    q2opts: { a: "はい", b: "いいえ" },
                    q3: "日付を選択してください：",
                    q3opts: { a: "1998年9月30日", b: "2025年9月24日", c: "2026年2月27日", d: "1995年7月19日", e: "2026年3月19日" }
                }
            }
        }
    },
    ko: {
        translation: {
            intro: { title: "pibble.", subtitle: "나는 pibble입니다.", action: "내 배를 씻어줘.", continue: "계속하기" },
            nanaPage: {
                greeting: "안녕, 나는 <1>rullian</1>이야. 케이트 덴슨 구출 1위이고, nana 팬이며, ada/becca 기 주로 루핑과 그림에서 1위야",
                motivosTitle: "공식적인 이유들", updated: "(매일 업데이트 됨)",
                motivos: [
                    "지능 + 창의성 = dti 여왕 여신",
                    "조사관 (지금은 초자연적이지 않음!)",
                    "너드", "nath core 게임들", "음악 취향", "pretty rave girl…", "귤",
                    "관대함", "고양이들", "pibbles", "죠죠러가 되어가는 중", "우리의 연결",
                    "HUG TECH, 그녀는 모든 HUG TECH를 알고 하나도 놓치지 않음", "all i wanted - paramore"
                ]
            },
            quiz: {
                questionNumber: "질문 {{current}} / {{total}}", next: "다음", finish: "완료",
                questions: {
                    q1: "그들은 누구에게 칩을 넣을 것인가?",
                    q1opts: { a: "우리에게", b: "noiz", c: "hur hur hur hur hur hur", d: "외계인에게", e: "Arthur Morgan", f: "이모들에게" },
                    q2: "이 존재는 스킨워커입니까?",
                    q2opts: { a: "네", b: "아니요" },
                    q3: "날짜를 선택하세요:",
                    q3opts: { a: "1998년 9월 30일", b: "2025년 9월 24일", c: "2026년 2월 27일", d: "1995년 7월 19일", e: "2026년 3월 19일" }
                }
            }
        }
    },
    zh: {
        translation: {
            intro: { title: "pibble.", subtitle: "我是pibble。", action: "洗我的肚子。", continue: "继续" },
            nanaPage: {
                greeting: "你好，我是<1>rullian</1>，kate denson救援第一，我是nana的粉丝，ada/becca主玩，looping和画画第一",
                motivosTitle: "官方原因", updated: "(每日更新)",
                motivos: [
                    "智力 + 创造力 = dti 女王 女神",
                    "调查员（暂且不是超自然的！）",
                    "书呆子", "nath core 游戏", "音乐品味", "pretty rave girl…", "橘子",
                    "慷慨", "猫", "pibbles", "成为jojofag的过程中", "我们的连接",
                    "HUG TECH，她知道所有的HUG TECH并且从不失误", "all i wanted - paramore"
                ]
            },
            quiz: {
                questionNumber: "问题 {{current}} / {{total}}", next: "下一题", finish: "完成",
                questions: {
                    q1: "他们要把芯片放进谁的身体里？",
                    q1opts: { a: "放进我们", b: "noiz", c: "hur hur hur hur hur hur", d: "放进外星人", e: "Arthur Morgan", f: "放进emo" },
                    q2: "这个生物是皮行者吗？",
                    q2opts: { a: "是", b: "否" },
                    q3: "选择一个日期：",
                    q3opts: { a: "1998年9月30日", b: "2025年9月24日", c: "2026年2月27日", d: "1995年7月19日", e: "2026年3月19日" }
                }
            }
        }
    },
    ar: {
        translation: {
            intro: { title: "pibble.", subtitle: "أنا pibble.", action: "اغسل بطني.", continue: "متابعة" },
            nanaPage: {
                greeting: "مرحباً، أنا <1>rullian</1>، الأول في إنقاذ كيت دينسون، وأنا معجب بـ nana، ألعب أساساً بـ ada/becca والأول في المراوغة والرسم",
                motivosTitle: "الأسباب الرسمية", updated: "(يتم التحديث يومياً)",
                motivos: [
                    "الذكاء + الإبداع = dti آلهة الملكة",
                    "محقق (ليس خارق للطبيعة، في الوقت الحالي!)",
                    "مهووس", "ألعاب nath core", "الذوق الموسيقي", "pretty rave girl…", "يوسفي",
                    "كرم", "قطط", "pibbles", "jojofag في طور التكوين", "تواصلنا",
                    "HUG TECH, إنها تعرف كل HUG TECH ولا تفوت أياً منها", "all i wanted - paramore"
                ]
            },
            quiz: {
                questionNumber: "سؤال {{current}} / {{total}}", next: "التالي", finish: "إنهاء",
                questions: {
                    q1: "في من سيضعون الشريحة؟",
                    q1opts: { a: "فينا", b: "noiz", c: "hur hur hur hur hur hur", d: "في الفضائيين", e: "Arthur Morgan", f: "في الإيمو" },
                    q2: "هل هذا الكائن skinwalker؟",
                    q2opts: { a: "نعم", b: "لا" },
                    q3: "اختر تاريخاً:",
                    q3opts: { a: "30 سبتمبر 1998", b: "24 سبتمبر 2025", c: "27 فبراير 2026", d: "19 يوليو 1995", e: "19 مارس 2026" }
                }
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "pt",
        interpolation: {
            escapeValue: false
        }
    });

// Handle RTL text direction dynamically
i18n.on('languageChanged', (lng) => {
    document.documentElement.dir = i18n.dir(lng);
    document.documentElement.lang = lng;
});

export default i18n;
