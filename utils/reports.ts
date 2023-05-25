import {
    AlignmentType,
    BorderStyle,
    convertMillimetersToTwip,
    Document,
    Packer,
    Paragraph,
    Table, TableBorders,
    TableCell,
    TableRow,
    VerticalAlign,
    WidthType,
    HeadingLevel,
    TextDirection, TextRun
} from "docx";
import {saveAs} from "file-saver";

export function tableOfParticipants(participants: object[],event:any) {
    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Волонтеры по мероприятию "+event.nameEvent,
                                size: 14 * 2,
                                bold: true
                            })
                        ],
                        alignment: AlignmentType.CENTER
                    }),new Paragraph({}),
                    new Table({
                        columnWidths: [3505, 5505],
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: convertMillimetersToTwip(7.7),
                                            type: WidthType.DXA
                                        },
                                        children: [new Paragraph({
                                            text: "№",
                                            alignment: AlignmentType.CENTER
                                        },), ],
                                        verticalAlign: VerticalAlign.CENTER,
                                    }),
                                    new TableCell({
                                        width: {
                                            size: convertMillimetersToTwip(80),
                                            type: WidthType.DXA
                                        },
                                        children: [new Paragraph({
                                            text: "ФИО, институт",
                                            alignment: AlignmentType.CENTER
                                        }), ],
                                        verticalAlign: VerticalAlign.CENTER,
                                    }),
                                    new TableCell({
                                        width: {
                                            size: convertMillimetersToTwip(41.1),
                                            type: WidthType.DXA
                                        },
                                        children: [new Paragraph({
                                            text: "Роль",
                                            alignment: AlignmentType.CENTER
                                        }), ],
                                        verticalAlign: VerticalAlign.CENTER,
                                    }),
                                    new TableCell({
                                        width: {
                                            size: convertMillimetersToTwip(41.2),
                                            type: WidthType.DXA
                                        },
                                        children: [new Paragraph({
                                            text: "Комментарий",
                                            alignment: AlignmentType.CENTER
                                        }), ],
                                        verticalAlign: VerticalAlign.CENTER,
                                    }),
                                ],
                            }),
                            ...participants.map((item, index) => new TableRow(
                                {
                                    children: [
                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    text: `${index + 1}`,
                                                    alignment: AlignmentType.CENTER
                                                }),
                                            ],
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    text: `${item.student.surName} ${item.student.name} ${item.student.middleName}, ${item.student.insitution}`,
                                                    alignment: AlignmentType.CENTER
                                                }),
                                            ],
                                            verticalAlign: VerticalAlign.CENTER,
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    text: "Волонтер",
                                                    alignment: AlignmentType.CENTER
                                                }),
                                            ],
                                            verticalAlign: VerticalAlign.CENTER,
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    text: `Волонтер позиции: ${item.fnd.nameFND}`,
                                                    alignment: AlignmentType.CENTER
                                                }),
                                            ],
                                            verticalAlign: VerticalAlign.CENTER,
                                        })
                                    ]
                                }
                            )),
                        ],
                    }),
                ],
            },
        ],
    });

// Used to export the file into a .docx file
    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `Список волонтеров по ${event.nameEvent}).docx`);
    });
}

export function appendix_6(event: any, participants: object[]) {
    const topTable = new Table({
        columnWidths: [3505, 5505],
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(164.4),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Наименование мероприятия",
                                    bold: true
                                })
                            ],
                            alignment: AlignmentType.LEFT
                        },),],
                        verticalAlign: VerticalAlign.TOP,

                    }),
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(164.4),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: event.nameEvent,
                            alignment: AlignmentType.LEFT
                        }),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(164.4),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Организатор мероприятия (студенческое объединение или институт)",
                                    bold: true
                                })
                            ],
                            alignment: AlignmentType.LEFT
                        },),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(164.4),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: event.organizations.map(item => item.name).join('; '),
                            alignment: AlignmentType.LEFT
                        }),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(164.4),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Дата проведения мероприятия",
                                    bold: true
                                })
                            ],
                            alignment: AlignmentType.LEFT
                        },),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(164.4),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: event.date.map(item => new Date(item).toLocaleDateString('ru')).join('; '),
                            alignment: AlignmentType.LEFT
                        }),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(164.4),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Место проведения мероприятия",
                                    bold: true
                                })
                            ],
                            alignment: AlignmentType.LEFT
                        },),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(164.4),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: event.addressEvent.join('; '),
                            alignment: AlignmentType.LEFT
                        }),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(164.4),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Масштаб (уровень) мероприятия",
                                    bold: true
                                })
                            ],
                            alignment: AlignmentType.LEFT
                        },),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(164.4),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: event.level,
                            alignment: AlignmentType.LEFT
                        }),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(164.4),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Описание мероприятия (не более 500 знаков с пробелами)",
                                    bold: true
                                })
                            ],
                            alignment: AlignmentType.LEFT
                        },),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(164.4),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: event.descriptionEvent.substr(0, 500),
                            alignment: AlignmentType.LEFT
                        }),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(164.4),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Ссылка на информационный ресурс (фото- видеоматериалы)",
                                    bold: true
                                })
                            ],
                            alignment: AlignmentType.LEFT
                        },),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(164.4),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: '/events/' + event.id,
                            alignment: AlignmentType.LEFT
                        }),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                ],
            }),
        ]
    })
    const participantsTable = new Table({
        columnWidths: [3505, 5505],
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(7.7),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "№",
                            alignment: AlignmentType.CENTER
                        },), new Paragraph({})],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(80),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "ФИО, институт",
                            alignment: AlignmentType.CENTER
                        }), new Paragraph({})],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(41.1),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "Роль",
                            alignment: AlignmentType.CENTER
                        }), new Paragraph({})],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        width: {
                            size: convertMillimetersToTwip(41.2),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "Комментарий",
                            alignment: AlignmentType.CENTER
                        }), new Paragraph({})],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                ],
            }),
            ...participants.map((item, index) => new TableRow(
                {
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    text: `${index + 1}`,
                                    alignment: AlignmentType.CENTER
                                }),
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    text: `${item.student.surName} ${item.student.name} ${item.student.middleName}, ${item.student.insitution}`,
                                    alignment: AlignmentType.CENTER
                                }),
                            ],
                            verticalAlign: VerticalAlign.CENTER,
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    text: "Волонтер",
                                    alignment: AlignmentType.CENTER
                                }),
                            ],
                            verticalAlign: VerticalAlign.CENTER,
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    text: `Волонтер позиции: ${item.fnd.nameFND}`,
                                    alignment: AlignmentType.CENTER
                                }),
                            ],
                            verticalAlign: VerticalAlign.CENTER,
                        })
                    ]
                }
            )),
        ]
    })

    const signature1 = new Table({
        columnWidths: [3505, 5505],
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(90),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "Руководитель студенческого сообщества",
                            alignment: AlignmentType.CENTER
                        },),],
                        verticalAlign: VerticalAlign.CENTER,
                        rowSpan: 2,
                    }),
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.SINGLE,
                                size: 10,
                                color: "#000000",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(32),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "",
                            alignment: AlignmentType.CENTER
                        }), new Paragraph({
                            border: {
                                top: {
                                    style: BorderStyle.NONE
                                }
                            }
                        })],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(1),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "",
                            alignment: AlignmentType.CENTER
                        }),],
                        verticalAlign: VerticalAlign.BOTTOM,
                        rowSpan: 2,
                    }),
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.SINGLE,
                                size: 10,
                                color: "#000000",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(46.8),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "",
                            alignment: AlignmentType.CENTER
                        }),],
                        verticalAlign: VerticalAlign.BOTTOM,
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(32),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "(подпись)",
                            alignment: AlignmentType.CENTER
                        }),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(46.8),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "(ФИО)",
                            alignment: AlignmentType.CENTER
                        }),],
                        verticalAlign: VerticalAlign.BOTTOM,
                    }),
                ],
            }),
        ]
    })
    const nullSignature = new Table({
        columnWidths: [3505, 5505],
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(90),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "",
                            alignment: AlignmentType.CENTER
                        },),],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(32),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "",
                            alignment: AlignmentType.CENTER
                        },),],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(1),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "",
                            alignment: AlignmentType.CENTER
                        },),],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(46.8),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "",
                            alignment: AlignmentType.CENTER
                        },),],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                ],
            })
        ]
    })
    const signature2 = new Table({
        columnWidths: [3505, 5505],
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(90),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "Начальник ОРСП",
                            alignment: AlignmentType.CENTER
                        },),],
                        verticalAlign: VerticalAlign.BOTTOM,
                    }),
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.SINGLE,
                                size: 10,
                                color: "#000000",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(32),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "",
                            alignment: AlignmentType.CENTER
                        }), new Paragraph({
                            border: {
                                top: {
                                    style: BorderStyle.NONE
                                }
                            }
                        })],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(1),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "",
                            alignment: AlignmentType.CENTER
                        }),],
                        verticalAlign: VerticalAlign.BOTTOM,
                        rowSpan: 2,
                    }),
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.SINGLE,
                                size: 10,
                                color: "#000000",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(46.8),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "",
                            alignment: AlignmentType.CENTER
                        }),],
                        verticalAlign: VerticalAlign.BOTTOM,
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(90),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            children: [
                                new TextRun({
                                    text: "(Для мероприятий уровня «Вунутривузовское» и выше)",
                                    size: 8 * 2,
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        },),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(32),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "(подпись)",
                            alignment: AlignmentType.CENTER
                        }),],
                        verticalAlign: VerticalAlign.TOP,
                    }),
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "auto",
                            },
                        },
                        width: {
                            size: convertMillimetersToTwip(46.8),
                            type: WidthType.DXA
                        },
                        children: [new Paragraph({
                            text: "(ФИО)",
                            alignment: AlignmentType.CENTER
                        }),],
                        verticalAlign: VerticalAlign.BOTTOM,
                    }),
                ],
            }),
        ]
    })

    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Приложение №6",
                            size: 14 * 2,
                        })
                    ],
                    alignment: AlignmentType.END
                }),new Paragraph({}),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "СПРАВКА",
                            size: 14 * 2,
                            bold:true
                        })
                    ],
                    alignment: AlignmentType.CENTER
                }),new Paragraph({}),
                topTable,
                new Paragraph({}),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Список студентов, причастных к организации мероприятия",
                            size: 12 * 2,
                        })
                    ],
                    alignment: AlignmentType.CENTER
                }),new Paragraph({}),
                participantsTable,
                new Paragraph({}),
                signature1, nullSignature, signature2]
        }],
    });
    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "Приложение 6.docx");
    });
}

export function test() {
    const table = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        borders: {
                            top: {
                                style: BorderStyle.DASH_SMALL_GAP,
                                size: 1,
                                color: "ff0000",
                            },
                            bottom: {
                                style: BorderStyle.DASH_SMALL_GAP,
                                size: 1,
                                color: "ff0000",
                            },
                            left: {
                                style: BorderStyle.DASH_SMALL_GAP,
                                size: 1,
                                color: "ff0000",
                            },
                            right: {
                                style: BorderStyle.DASH_SMALL_GAP,
                                size: 1,
                                color: "ff0000",
                            },
                        },
                        children: [new Paragraph("Hello")],
                    }),
                    new TableCell({
                        children: [],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [],
                    }),
                    new TableCell({
                        children: [new Paragraph("World")],
                    }),
                ],
            }),
        ],
    });

    const noBorderTable = new Table({
        borders: TableBorders.NONE,
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({}), new Paragraph({})],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        children: [new Paragraph({}), new Paragraph({})],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        children: [new Paragraph({text: "bottom to top"}), new Paragraph({})],
                        textDirection: TextDirection.BOTTOM_TO_TOP_LEFT_TO_RIGHT,
                    }),
                    new TableCell({
                        children: [new Paragraph({text: "top to bottom"}), new Paragraph({})],
                        textDirection: TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                            new Paragraph({
                                text: "Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah",
                                heading: HeadingLevel.HEADING_1,
                            }),
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({
                                text: "This text should be in the middle of the cell",
                            }),
                        ],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({
                                text: "Text above should be vertical from bottom to top",
                            }),
                        ],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({
                                text: "Text above should be vertical from top to bottom",
                            }),
                        ],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                ],
            }),
        ],
    });

    const doc = new Document({
        sections: [{children: [table, new Paragraph("Hello"), noBorderTable]}],
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "My Document.docx");
    });
}

export function rating(ratingList:object[]){
    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Рейтинг волонтеров",
                                size: 14 * 2,
                                bold: true
                            })
                        ],
                        alignment: AlignmentType.CENTER
                    }),new Paragraph({}),
                    new Table({
                        columnWidths: [3505, 5505],
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: convertMillimetersToTwip(7.7),
                                            type: WidthType.DXA
                                        },
                                        children: [new Paragraph({
                                            text: "Место",
                                            alignment: AlignmentType.CENTER
                                        },), ],
                                        verticalAlign: VerticalAlign.CENTER,
                                    }),
                                    new TableCell({
                                        width: {
                                            size: convertMillimetersToTwip(80),
                                            type: WidthType.DXA
                                        },
                                        children: [new Paragraph({
                                            text: "ФИО",
                                            alignment: AlignmentType.CENTER
                                        }), ],
                                        verticalAlign: VerticalAlign.CENTER,
                                    }),
                                    new TableCell({
                                        width: {
                                            size: convertMillimetersToTwip(41.1),
                                            type: WidthType.DXA
                                        },
                                        children: [new Paragraph({
                                            text: "Кол-во мероприятий",
                                            alignment: AlignmentType.CENTER
                                        }), ],
                                        verticalAlign: VerticalAlign.CENTER,
                                    }),
                                    new TableCell({
                                        width: {
                                            size: convertMillimetersToTwip(41.2),
                                            type: WidthType.DXA
                                        },
                                        children: [new Paragraph({
                                            text: "Кол-во времени",
                                            alignment: AlignmentType.CENTER
                                        }), ],
                                        verticalAlign: VerticalAlign.CENTER,
                                    }),
                                ],
                            }),
                            ...ratingList.map((item, index) => new TableRow(
                                {
                                    children: [
                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    text: `${item.place}`,
                                                    alignment: AlignmentType.CENTER
                                                }),
                                            ],
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    text: `${item.student}`,
                                                    alignment: AlignmentType.CENTER
                                                }),
                                            ],
                                            verticalAlign: VerticalAlign.CENTER,
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    text: `${item._count.fndId}`,
                                                    alignment: AlignmentType.CENTER
                                                }),
                                            ],
                                            verticalAlign: VerticalAlign.CENTER,
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    text: `${item._sum.numberOfHours}`,
                                                    alignment: AlignmentType.CENTER
                                                }),
                                            ],
                                            verticalAlign: VerticalAlign.CENTER,
                                        })
                                    ]
                                }
                            )),
                        ],
                    }),
                ],
            },
        ],
    });

// Used to export the file into a .docx file
    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `Рейтинг волонтеров.docx`);
    });
}
