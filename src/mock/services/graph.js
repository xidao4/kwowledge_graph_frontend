import Mock from 'mockjs2';
import { builder, getBody } from '../util';

const save = (options) => {
    const body = getBody(options);
    console.log('save mock: body', body);
    return builder({
        code: 0,
        data: "保存成功"
    }, '', 200, { 'Custom-Header': Mock.mock('@guid') });
};

const thumbnail = (options) => {
    const body = getBody(options);
    console.log('thumbnail mock: body', body);
    return builder({
        code: 0,
        data: "缩略图保存成功"
    }, '', 200, { 'Custom-Header': Mock.mock('@guid') });
};

const getPicElement = (options) => {
    const body = getBody(options);
    console.log('getPicElement mock body', body);
    return builder({
        code: 0,
        data: {
            picId: "0",
            fnodes: [
                {
                    "id": "0",
                    "label": "0",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 337.3677230574921,
                    "y": 313.07411102594847,
                    "layoutOrder": 0,
                    "index": 0,
                    "vy": 0.02757607632599063,
                    "vx": -0.02845074761724194
                },
                {
                    "id": "1",
                    "label": "1",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 306.9752735500157,
                    "y": 275.72310638034145,
                    "layoutOrder": 0,
                    "index": 1,
                    "vy": 0.02649234052256354,
                    "vx": 0.023169229171781915
                },
                {
                    "id": "2",
                    "label": "2",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 348.04528665575106,
                    "y": 265.6192385070557,
                    "layoutOrder": 0,
                    "index": 2,
                    "vy": 0.05497564282634322,
                    "vx": -0.18944352449784405
                },
                {
                    "id": "3",
                    "label": "3",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 382.6668517468481,
                    "y": 289.7793594699109,
                    "layoutOrder": 0,
                    "index": 3,
                    "vy": 0.1786137484089252,
                    "vx": -0.16193453189712695
                },
                {
                    "id": "4",
                    "label": "4",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 307.7928833228778,
                    "y": 358.3701926851111,
                    "layoutOrder": 0,
                    "index": 4,
                    "vy": -0.28666723307608777,
                    "vx": -0.049122591966191204
                },
                {
                    "id": "5",
                    "label": "5",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 345.4821651513152,
                    "y": 357.3057940828229,
                    "layoutOrder": 0,
                    "index": 5,
                    "vy": -0.1511315877844683,
                    "vx": 0.18247329762996883
                },
                {
                    "id": "6",
                    "label": "6",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 340.5413837830889,
                    "y": 402.2952856698578,
                    "layoutOrder": 0,
                    "index": 6,
                    "vy": -0.23860635852549789,
                    "vx": -0.20132556235122157
                },
                {
                    "id": "7",
                    "label": "7",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 368.14240568888437,
                    "y": 275.5886506246344,
                    "layoutOrder": 0,
                    "index": 7,
                    "vy": 0.04049818076868048,
                    "vx": -0.05053893804961674
                },
                {
                    "id": "8",
                    "label": "8",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 290.03108749896046,
                    "y": 321.74184811916234,
                    "layoutOrder": 0,
                    "index": 8,
                    "vy": 0.10857598499723546,
                    "vx": 0.008202309379768147
                },
                {
                    "id": "9",
                    "label": "9",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 297.52345492552763,
                    "y": 340.3587759677685,
                    "layoutOrder": 0,
                    "index": 9,
                    "vy": 0.09603573814977029,
                    "vx": 0.035486440959323184
                }
            ],
            fedges: [
                {
                    "source": "0",
                    "target": "1",
                    "id": "edge-0.47420669040003661617616146781",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 330.7406235106064,
                        "y": 304.9296925939383
                    },
                    "endPoint": {
                        "x": 313.60237309690143,
                        "y": 283.86752481235163
                    }
                },
                {
                    "source": "0",
                    "target": "2",
                    "id": "edge-0.97155716545521617616146782",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 339.67264574985325,
                        "y": 302.83021863183194
                    },
                    "endPoint": {
                        "x": 345.74036396338994,
                        "y": 275.8631309011722
                    }
                },
                {
                    "source": "0",
                    "target": "3",
                    "id": "edge-0.1585843159316481617616146833",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 346.70540788942833,
                        "y": 308.2722736714113
                    },
                    "endPoint": {
                        "x": 373.3291669149119,
                        "y": 294.58119682444806
                    }
                },
                {
                    "source": "0",
                    "target": "4",
                    "id": "edge-0.79432536450533361617616146865",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 331.6272934219328,
                        "y": 321.86600886425344
                    },
                    "endPoint": {
                        "x": 313.53331295843714,
                        "y": 349.5782948468061
                    }
                },
                {
                    "source": "0",
                    "target": "5",
                    "id": "edge-0.62138074488516031617616146890",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 339.2623629680702,
                        "y": 323.40176030394224
                    },
                    "endPoint": {
                        "x": 343.58752524073714,
                        "y": 346.9781448048291
                    }
                },
                {
                    "source": "0",
                    "target": "7",
                    "id": "edge-0.75982720721735491617616146902",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 344.0302961978604,
                        "y": 304.9586862589235
                    },
                    "endPoint": {
                        "x": 361.4798325485161,
                        "y": 283.7040753916594
                    }
                },
                {
                    "source": "0",
                    "target": "8",
                    "id": "edge-0.44811310578623021617616146903",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 327.0394424420172,
                        "y": 314.9653062903263
                    },
                    "endPoint": {
                        "x": 300.35936811443537,
                        "y": 319.8506528547845
                    }
                },
                {
                    "source": "0",
                    "target": "9",
                    "id": "edge-0.74711316217728261617616146904",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 328.70430755339333,
                        "y": 319.0066679623243
                    },
                    "endPoint": {
                        "x": 306.1868704296264,
                        "y": 334.4262190313927
                    }
                },
                {
                    "source": "2",
                    "target": "3",
                    "id": "edge-0.90201441460687981617616146904",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 356.6559729778351,
                        "y": 271.62807209292527
                    },
                    "endPoint": {
                        "x": 374.05616542476406,
                        "y": 283.7705258840413
                    }
                },
                {
                    "source": "4",
                    "target": "5",
                    "id": "edge-0.89349660141438281617616146904",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 318.28869854435777,
                        "y": 358.07377602473343
                    },
                    "endPoint": {
                        "x": 334.9863499298352,
                        "y": 357.60221074320054
                    }
                },
                {
                    "source": "4",
                    "target": "6",
                    "id": "edge-0.083835374157209991617616146904",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 314.0689015062144,
                        "y": 366.78812567144615
                    },
                    "endPoint": {
                        "x": 334.26536559975233,
                        "y": 393.8773526835227
                    }
                },
                {
                    "source": "5",
                    "target": "6",
                    "id": "edge-0.94850540305780621617616146904",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 344.33593826758994,
                        "y": 367.74304295074904
                    },
                    "endPoint": {
                        "x": 341.6876106668142,
                        "y": 391.85803680193163
                    }
                }
            ],
            sedges: [
                {
                    "source": "0",
                    "target": "1",
                    "id": "edge-0.85847114884395291617615164082",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 322.11994526697214,
                        "y": 321.5825497588848
                    },
                    "endPoint": {
                        "x": 184.70779213450837,
                        "y": 342.5324941860262
                    }
                },
                {
                    "source": "0",
                    "target": "2",
                    "id": "edge-0.316589710750494251617615164084",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 325.3833288123186,
                        "y": 327.7202973522025
                    },
                    "endPoint": {
                        "x": 231.17215785158396,
                        "y": 429.9223289670742
                    }
                },
                {
                    "source": "0",
                    "target": "3",
                    "id": "edge-0.113124678954124261617615164084",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 324.11102739749344,
                        "y": 326.3146764504917
                    },
                    "endPoint": {
                        "x": 213.05700913573983,
                        "y": 409.90896469985773
                    }
                },
                {
                    "source": "0",
                    "target": "4",
                    "id": "edge-0.79477566786219111617615164085",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 330.25203317557373,
                        "y": 330.256541578733
                    },
                    "endPoint": {
                        "x": 300.4932342617403,
                        "y": 466.0336158114842
                    }
                },
                {
                    "source": "0",
                    "target": "5",
                    "id": "edge-0.451752619886424571617615164085",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 328.41948332200127,
                        "y": 329.6746774437484
                    },
                    "endPoint": {
                        "x": 274.40121491801796,
                        "y": 457.74897884194155
                    }
                },
                {
                    "source": "0",
                    "target": "7",
                    "id": "edge-0.72677147521888361617615164085",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 326.6323388232963,
                        "y": 328.7074997740686
                    },
                    "endPoint": {
                        "x": 248.95568134121925,
                        "y": 443.9782110688813
                    }
                },
                {
                    "source": "0",
                    "target": "8",
                    "id": "edge-0.71235245464665751617615164087",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 322.5612401025747,
                        "y": 323.38689410837276
                    },
                    "endPoint": {
                        "x": 190.99099003189667,
                        "y": 368.2229208763553
                    }
                },
                {
                    "source": "0",
                    "target": "9",
                    "id": "edge-0.53919691143120431617615164087",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 323.2597191555642,
                        "y": 324.98670331140255
                    },
                    "endPoint": {
                        "x": 200.9360013101762,
                        "y": 391.0011566718743
                    }
                },
                {
                    "source": "2",
                    "target": "3",
                    "id": "edge-0.313724237326409751617615164087",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 217.00922452478798,
                        "y": 429.85801394184386
                    },
                    "endPoint": {
                        "x": 211.71429867234787,
                        "y": 424.00825352778224
                    }
                },
                {
                    "source": "4",
                    "target": "5",
                    "id": "edge-0.406517706800876951617615164087",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 288.23762372503154,
                        "y": 473.11256910222085
                    },
                    "endPoint": {
                        "x": 280.32834195230174,
                        "y": 470.6012445736863
                    }
                },
                {
                    "source": "4",
                    "target": "6",
                    "id": "edge-0.234411241609991271617615164088",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 298.7403455364253,
                        "y": 486.77847935685134
                    },
                    "endPoint": {
                        "x": 305.4255563966619,
                        "y": 628.405919639251
                    }
                },
                {
                    "source": "5",
                    "target": "6",
                    "id": "edge-0.337965370430817651617615164088",
                    "style": {
                        "active": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 1
                        },
                        "selected": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "stroke": "rgb(234, 234, 234)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "stroke": "rgb(245, 245, 245)",
                            "lineWidth": 1
                        }
                    },
                    "startPoint": {
                        "x": 272.4551436431875,
                        "y": 477.70442195858095
                    },
                    "endPoint": {
                        "x": 303.78618909260484,
                        "y": 628.6134759329942
                    }
                }
            ],
            snodes: [
                {
                    "id": "0",
                    "label": "0",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 332.5,
                    "y": 320,
                    "layoutOrder": 0
                },
                {
                    "id": "1",
                    "label": "1",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 174.32773740148053,
                    "y": 344.115043944911,
                    "layoutOrder": 0
                },
                {
                    "id": "2",
                    "label": "2",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 224.05548666390257,
                    "y": 437.6426263192767,
                    "layoutOrder": 0
                },
                {
                    "id": "3",
                    "label": "3",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 204.66803653323328,
                    "y": 416.2236411503494,
                    "layoutOrder": 0
                },
                {
                    "id": "4",
                    "label": "4",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 298.24526743731406,
                    "y": 476.2901573902172,
                    "layoutOrder": 0
                },
                {
                    "id": "5",
                    "label": "5",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 270.3206982400192,
                    "y": 467.42365628568996,
                    "layoutOrder": 0
                },
                {
                    "id": "6",
                    "label": "6",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 305.92063449577313,
                    "y": 638.8942416058852,
                    "layoutOrder": 0
                },
                {
                    "id": "7",
                    "label": "7",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 243.08802016451557,
                    "y": 452.6857108429499,
                    "layoutOrder": 0
                },
                {
                    "id": "8",
                    "label": "8",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 181.05223013447136,
                    "y": 371.6098149847281,
                    "layoutOrder": 0
                },
                {
                    "id": "9",
                    "label": "9",
                    "size": 20,
                    "type": "circle",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    },
                    "x": 191.69572046574044,
                    "y": 395.98785998327685,
                    "layoutOrder": 0
                }
            ]
        }
    })
};

Mock.mock(/\/api\/graph\/save/, 'post', save);
Mock.mock(/\/api\/graph\/thumbnail/, 'post', thumbnail);
Mock.mock(/\/api\/graph\/getPicElements/, 'post', getPicElement);
