sap.ui.define([], function () {
    "use strict";

    var STORAGE_KEY = "yclf.meta.compromisso.mock.v4";
    var BUSINESS_FIELDS = ["budget", "commitment", "billed", "monthlyPortfolio"];
    var SALES_OFFICES_BY_SEGMENT = {
        "01": ["0031", "0033", "0042", "0121", "0141", "0142", "0143", "0144", "0147"],
        "02": ["0030", "0038", "0037", "0042", "0129", "0155", "0166", "0171", "0203"],
        "03": ["FT01", "FT02", "TB01", "TB02", "TB03", "TB04", "TB05", "TB06", "TB07", "TB08", "TB09", "TP01"],
        "04": ["0007", "0008", "0010", "0011", "0012", "0015", "0017", "0019", "0022", "0054", "0189", "0208", "0209"],
        "05": ["0002", "0003", "0004", "0005", "0027", "0035", "0078", "0091", "0177", "0208", "0209"],
        "06": ["0032", "0034", "0036", "0039", "0040", "0046", "0050", "0182", "0203"]
    };
    var SALES_OFFICES_BY_FAMILY = {
        ESTOJO: ["0008", "0010", "0012", "0209"],
        PICAPAU: ["0007", "0011", "0015", "0208"],
        SEMI: ["0002", "0004", "0027", "0209"],
        TUPA: ["0010", "0017", "0019", "0208"],
        PUMP: ["0032", "0036", "0040", "0203"],
        TAURUS: ["0030", "0038", "0042", "0129"],
        PRESSAO: ["0003", "0035", "0078", "0177"],
        CACA: ["0007", "0011", "0054", "0189"],
        COMPETICAO: ["0008", "0012", "0022", "0209"],
        RIFLES: ["0031", "0033", "0141", "0144"],
        LEVER: ["0004", "0091", "0177", "0208"],
        CENTRAL: ["0208", "0209", "0012", "0022", "0054"],
        CIRCULAR: ["0007", "0010", "0015", "0019"],
        RANGER: ["0037", "0155", "0166", "0171"],
        RIOGRANDE: ["0032", "0034", "0046", "0050"],
        CZ: ["0142", "0143", "0147", "0203"]
    };
    var ORDER_CRITIQUE_ROWS = [
        { id: "AJUSTE", name: "AJUSTE", quantity: 0, value: 0, percentage: 0 },
        { id: "CADASTRO", name: "CADASTRO", quantity: 0, value: 0, percentage: 0 },
        { id: "CR_VENCIDO", name: "CR VENCIDO", quantity: 0, value: 0, percentage: 0 },
        { id: "EM_PROCESSAMENTO", name: "EM PROCESSAMENTO", quantity: 845430, value: 2840570, percentage: 0.21 },
        { id: "ESTOQUE", name: "ESTOQUE", quantity: 1311930, value: 4459696, percentage: 0.33 },
        { id: "FINANCEIRO", name: "FINANCEIRO", quantity: 338390, value: 1201092, percentage: 0.09 },
        { id: "SEM_AUTORIZACAO", name: "SEM AUTORIZAÇÃO", quantity: 0, value: 0, percentage: 0 },
        { id: "LIMITE_CR", name: "LIMITE CR", quantity: 0, value: 0, percentage: 0 },
        { id: "PROGRAMADOS", name: "PROGRAMADOS", quantity: 961010, value: 3630992, percentage: 0.24 },
        { id: "REMESSA", name: "REMESSA", quantity: 473220, value: 1614474, percentage: 0.12 },
        { id: "VALOR_MINIMO", name: "VALOR MÍNIMO", quantity: 2280, value: 9746, percentage: 0 }
    ];

    function toNumber(value) {
        var number = Number(value);
        return Number.isFinite(number) ? number : 0;
    }

    function calculateRow(row) {
        var calculated = Object.assign({}, row);
        calculated.portfolioAndBilled = toNumber(row.monthlyPortfolio) + toNumber(row.billed);
        calculated.balance = calculated.portfolioAndBilled - toNumber(row.commitment);
        calculated.balanceVsBudget = calculated.portfolioAndBilled - toNumber(row.budget);
        calculated.achievementVsCommitment = toNumber(row.commitment) ?
            calculated.portfolioAndBilled / toNumber(row.commitment) : 0;
        calculated.achievementVsBudget = toNumber(row.budget) ?
            calculated.portfolioAndBilled / toNumber(row.budget) : 0;
        calculated.achievement = toNumber(row.commitment) ?
            calculated.portfolioAndBilled / toNumber(row.commitment) : 0;
        calculated.managementOrder = calculated.management === "GNI" ? 2 : 1;
        return calculated;
    }

    function addSalesOfficeIds(row, salesOfficesById) {
        return Object.assign({}, row, {
            salesOfficeIds: row.salesOfficeIds || salesOfficesById[row.id] || []
        });
    }

    function totalRows(rows, label) {
        var total = rows.reduce(function (result, row) {
            BUSINESS_FIELDS.forEach(function (field) {
                result[field] += toNumber(row[field]);
            });
            result.portfolioAndBilled += toNumber(row.portfolioAndBilled);
            result.balance += toNumber(row.balance);
            result.balanceVsBudget += toNumber(row.balanceVsBudget);
            return result;
        }, {
            id: "TOTAL",
            name: label,
            budget: 0,
            commitment: 0,
            billed: 0,
            monthlyPortfolio: 0,
            portfolioAndBilled: 0,
            balance: 0,
            balanceVsBudget: 0,
            isTotal: true
        });
        total.management = "GNI";
        total.managementOrder = 2;
        total.achievementVsCommitment = total.commitment ? total.portfolioAndBilled / total.commitment : 0;
        total.achievementVsBudget = total.budget ? total.portfolioAndBilled / total.budget : 0;
        total.achievement = total.commitment ? total.portfolioAndBilled / total.commitment : 0;
        return total;
    }

    function calculateSegmentConsultantRow(row) {
        var calculated = calculateRow(row);
        calculated.previousMonthPortfolio = toNumber(row.previousMonthPortfolio);
        calculated.quotaJune = toNumber(row.quotaJune);
        calculated.commitmentJune = toNumber(row.commitmentJune);
        calculated.accumulatedOrders = toNumber(row.accumulatedOrders);
        calculated.dayEntry = toNumber(row.dayEntry);
        calculated.remittancePortfolio = toNumber(row.remittancePortfolio);
        calculated.totalMonthBalance = calculated.portfolioAndBilled -
            calculated.previousMonthPortfolio -
            calculated.commitmentJune;
        calculated.fatCartComp = calculated.achievement;
        return calculated;
    }

    function totalSegmentConsultantRows(rows, label) {
        var total = rows.reduce(function (result, row) {
            [
                "previousMonthPortfolio",
                "quotaJune",
                "commitmentJune",
                "accumulatedOrders",
                "dayEntry",
                "monthlyPortfolio",
                "remittancePortfolio",
                "billed",
                "portfolioAndBilled",
                "totalMonthBalance"
            ].forEach(function (field) {
                result[field] += toNumber(row[field]);
            });
            return result;
        }, {
            id: "TOTAL",
            name: label,
            previousMonthPortfolio: 0,
            quotaJune: 0,
            commitmentJune: 0,
            accumulatedOrders: 0,
            dayEntry: 0,
            monthlyPortfolio: 0,
            remittancePortfolio: 0,
            billed: 0,
            portfolioAndBilled: 0,
            totalMonthBalance: 0,
            isTotal: true
        });
        total.achievement = total.commitmentJune ?
            total.portfolioAndBilled / total.commitmentJune : 0;
        total.fatCartComp = total.achievement;
        return total;
    }

    function buildOrderCritiques() {
        var rows = ORDER_CRITIQUE_ROWS.map(function (row) {
            return Object.assign({}, row);
        });
        rows.push(totalOrderCritiqueRows(rows));
        return rows;
    }

    function totalOrderCritiqueRows(rows) {
        return rows.reduce(function (total, row) {
            total.quantity += toNumber(row.quantity);
            total.value += toNumber(row.value);
            return total;
        }, {
            id: "TOTAL",
            name: "TOTAL",
            quantity: 0,
            value: 0,
            percentage: 1,
            isTotal: true
        });
    }

    function calculateData(data) {
        if (!data || !Array.isArray(data.segments) || !Array.isArray(data.families)) {
            throw new Error("Os dados de Meta e Compromisso possuem formato inválido.");
        }
        ["segments", "families"].forEach(function (collection) {
            var salesOfficesById = collection === "segments" ?
                SALES_OFFICES_BY_SEGMENT : SALES_OFFICES_BY_FAMILY;
            data[collection] = data[collection].filter(function (row) {
                return !row.isTotal;
            }).map(function (row) {
                return addSalesOfficeIds(row, salesOfficesById);
            }).map(calculateRow);
            data[collection].push(totalRows(data[collection], "Total geral"));
        });
        data.segmentDetails = data.segments.filter(function (segment) {
            return !segment.isTotal;
        }).map(function (segment, segmentIndex) {
            return {
                segmentId: segment.id,
                title: segment.id === "04" ? "VAREJO" : segment.name.toUpperCase(),
                businessDays: 21,
                elapsedPercentage: 0.43,
                elapsedDays: 9,
                referenceDate: "11.06",
                salesManager: segment.salesTeamId === "GNI" ?
                    "Gestão de Negócios Internos" : "Erika Medeiros",
                salesTeam: segment.salesTeamId === "GNI" ?
                    "Equipe GNI" : "Equipe Erika Medeiros",
                orderCritiques: buildOrderCritiques(),
                consultants: data.consultantTemplate.map(function (consultant, consultantIndex) {
                    var factor = 0.7 + (segmentIndex * 0.03) + (consultantIndex * 0.02);
                    var billed = Math.round(segment.billed * consultant.share * factor);
                    var monthlyPortfolio = Math.round(segment.monthlyPortfolio * consultant.share);
                    return {
                        id: consultant.id,
                        name: consultant.name,
                        budget: Math.round(segment.budget * consultant.share),
                        commitment: Math.round(segment.commitment * consultant.share),
                        billed: billed,
                        monthlyPortfolio: monthlyPortfolio,
                        previousMonthPortfolio: Math.round(monthlyPortfolio * (0.62 + consultantIndex * 0.03)),
                        quotaJune: Math.round(segment.budget * consultant.share),
                        commitmentJune: Math.round(segment.commitment * consultant.share),
                        accumulatedOrders: Math.round((billed + monthlyPortfolio) * (0.48 + consultantIndex * 0.04)),
                        dayEntry: Math.round((billed + monthlyPortfolio) * (0.18 + consultantIndex * 0.012)),
                        remittancePortfolio: Math.round(monthlyPortfolio * (0.12 + consultantIndex * 0.015))
                    };
                })
            };
        });
        data.segmentDetails.forEach(function (detail) {
            detail.consultants = detail.consultants.filter(function (row) {
                return !row.isTotal;
            }).map(calculateSegmentConsultantRow);
            detail.consultants.push(totalSegmentConsultantRows(detail.consultants, "Total"));
        });

        data.familyDetails = data.families.filter(function (family) {
            return !family.isTotal;
        }).map(function (family, familyIndex) {
            var existingDetail = (data.familyDetails || []).find(function (detail) {
                return detail.familyId === family.id;
            });
            if (existingDetail) {
                return Object.assign({}, existingDetail, {
                    orderCritiques: existingDetail.orderCritiques || buildOrderCritiques()
                });
            }
            return {
                familyId: family.id,
                salesManager: "Erika Medeiros",
                salesTeam: "Equipe Erika Medeiros",
                orderCritiques: buildOrderCritiques(),
                consultants: data.consultantTemplate.map(function (consultant, consultantIndex) {
                    var factor = 0.55 + (familyIndex * 0.04) + (consultantIndex * 0.025);
                    return {
                        id: consultant.id,
                        name: consultant.name,
                        budget: Math.round(family.budget * consultant.share),
                        commitment: Math.round(family.commitment * consultant.share),
                        billed: Math.round(family.billed * consultant.share * factor),
                        monthlyPortfolio: Math.round(family.monthlyPortfolio * consultant.share)
                    };
                })
            };
        });
        data.familyDetails.forEach(function (detail) {
            detail.consultants = detail.consultants.filter(function (row) {
                return !row.isTotal;
            }).map(calculateRow);
            detail.consultants.push(totalRows(detail.consultants, "Total geral"));
        });
        return data;
    }

    function readStoredData() {
        try {
            return JSON.parse(window.localStorage.getItem(STORAGE_KEY));
        } catch (error) {
            return null;
        }
    }

    function load(model) {
        var storedData = readStoredData();
        var mockDataUrl = sap.ui.require.toUrl(
            "yclf/dash360/metacompromisso/model/mock.json"
        );

        if (storedData) {
            model.setData(calculateData(storedData));
            return;
        }

        model.attachRequestCompleted(function (event) {
            if (!event.getParameter("success")) {
                return;
            }
            model.setData(calculateData(model.getData()));
        });
        model.loadData(mockDataUrl);
    }

    function persist(model) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(model.getData()));
    }

    function recalculate(model) {
        model.setData(calculateData(model.getData()));
        persist(model);
    }

    function findFamilyDetail(data, familyId) {
        return data.familyDetails.find(function (detail) {
            return detail.familyId === familyId;
        });
    }

    function findSegmentDetail(data, segmentId) {
        return data.segmentDetails.find(function (detail) {
            return detail.segmentId === segmentId;
        });
    }

    return {
        calculateRow: calculateRow,
        calculateData: calculateData,
        findFamilyDetail: findFamilyDetail,
        findSegmentDetail: findSegmentDetail,
        load: load,
        persist: persist,
        recalculate: recalculate
    };
});
