define([
   

], function () {

    return { 
        map: true,

       // url: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/DamageAssessment/MapServer',
      //  layerIds: [0],
      //  numberFields: ['OBJECTID'],
      //  nameFields: ['Primary Cause of Damage'],
      //  instIDFields: ['primcause'],


        url: 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer',
        layerIds: 5,
        zoomScale: 10,
        numberFields: ['ObjectID'],
        nameFields: ['STATE_NAME'],
        instIDFields: ['STATE_NAME'],
        instIDFieldLike: ['asdasdasd'],
        layerGroupName: ['demographicsMain'],
        infoTitle: "State: ${STATE_NAME}",
        infoContent: "<b>ObjectID: </b>${ObjectID}",
        minChars: 2,
        gridColumns: [
                 { field: 'Name', label: 'Name' },
                 { field: 'layerName', label: 'Layer', width: 100, sortable: false, resizable: false }
        ],
        sort: [
            {
                attribute: 'Name',
                descending: false
            }
        ],
        prompt: 'fdname, pdname, name or resname',
        selectionMode: 'single',


        bookmarkData: [{
            label: '<b>ACC</b>',
            id: '1',
            xmin: '-14300898.57',
            ymin: '2678719.83',
            xmax: '-6659641.73',
            ymax: '7003221.14',
           
            children: [
                          { id: '1.001', label: 'Beale AFB (BAEY)', comment: 'Air Combat Command', buildingsearch: 'true', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/beale_afb/', instlid: 'Washington', xmin: '-13539613.8963', ymin: '4725883.7815', xmax: '-13486337.2876', ymax: '4752025.2451' }
                        , { id: '1.002', label: 'Creech AFB (LKTC)', comment: 'Air Combat Command', buildingsearch: 'true', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/creech_afb/', xmin: '-12883757.78', instlid: 'LKTC', ymin: '4377966.2114', xmax: '-12870438.6278', ymax: '4384501.5773' }
                        , { id: '1.003', label: 'Davis Monthan AFB (FBNV)', comment: 'Air Combat Command', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/davis_monthan_afb/', buildingsearch: 'true', instlid: 'FBNV', xmin: '-12352300', ymin: '3780900', xmax: '-12334000', ymax: '3789900' }
                        , { id: '1.005', label: 'Ft. Eustis (HERT)', comment: 'Air Combat Command', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/fort_eustis_army/', buildingsearch: 'true', instlid: 'HERT', xmin: '-8544000', ymin: '4446900', xmax: '-8507300', ymax: '4464900' }
                        , { id: '1.007', label: 'Holloman AFB (KWRD)', comment: 'Air Combat Command', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/holloman_afb/', buildingsearch: 'true', instlid: 'KWRD', xmin: '-11824644.7293', ymin: '3868001.8218', xmax: '-11799324.9637', ymax: '3881129.8814' }
                        , { id: '1.008', label: 'Langley AFB (MUHJ)', comment: 'Air Combat Command', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/langley_afb/', buildingsearch: 'true', instlid: 'MUHJ', xmin: '-8507282.0213', ymin: '4447095.6075', xmax: '-8494622.1385', ymax: '4453659.6373' }
                        , { id: '1.009', label: 'Moody AFB (QSEU)', comment: 'Air Combat Command', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/moody_afb/', buildingsearch: 'true', instlid: 'QSEU', xmin: '-9268079.2994', ymin: '3625516.6751', xmax: '-9255419.4166', ymax: '3632080.7049' }
                        , { id: '1.01', label: 'Mountain Home AFB (QYZG)', comment: 'Air Combat Command', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/mountain_home_afb/', buildingsearch: 'true', instlid: 'QYZH', xmin: '-12904953.5502', ymin: '5315802.2368', xmax: '-12892293.6674', ymax: '5322366.2666' }
                        , { id: '1.011', label: 'Nellis AFB (RKMF)', comment: 'Air Combat Command', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/nellis_afb/', buildingsearch: 'true', instlid: 'RKMF', xmin: '-12812491.8116', ymin: '4329609.3094', xmax: '-12799831.9287', ymax: '4336173.3392' }
                        , { id: '1.012', label: 'Offutt AFB (SGBP)', comment: 'Air Combat Command', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/offutt_afb/', buildingsearch: 'true', instlid: 'SGBP', xmin: '-10683579.2794', ymin: '5026769.5118', xmax: '-10670919.3966', ymax: '5033333.5416' }
                        , { id: '1.013', label: 'Seymour Johnson AFB (VKAG)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/seymour_johnson_afb/', comment: 'Air Combat Command', buildingsearch: 'true', instlid: 'VKAG', xmin: '-8685341.1478', ymin: '4207469.3971', xmax: '-8672681.265', ymax: '4214033.4269' }
                        , { id: '1.014', label: 'Shaw AFB (VLSB)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/shaw_afb/', comment: 'Air Combat Command', buildingsearch: 'true', instlid: 'VLSB', xmin: '-8964338.7422', ymin: '4021745.1353', xmax: '-8951678.8594', ymax: '4028309.1651' }
                        , { id: '1.015', label: 'Tyndall AFB (XLWU)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/tyndall_afb/', comment: 'Air Combat Command', buildingsearch: 'true', instlid: 'XLWU', xmin: '-9544636.16', ymin: '3502482.03', xmax: '-9508003.71', ymax: '3523139.14' }


            ]

        }, {
            label: '<b>AETC</b>',
            id: '2',
            xmin: '-14300898.57',
            ymin: '2678719.83',
            xmax: '-6659641.73',
            ymax: '7003221.14',
            children: [
                          { id: '2.001', label: 'Altus AFB (AGGN)', instlid: 'AGGN', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/altus_afb/', buildingsearch: 'false', xmin: '-11069800', ymin: '4111100', xmax: '-11039800', ymax: '4124000' }
                        , { id: '2.002', label: 'Goodfellow AFB (JCGU)', instlid: 'JCGU', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/goodfellow_afb/', buildingsearch: 'false', xmin: '-11185300', ymin: '3686100', xmax: '-11170300', ymax: '3692600' }
                        , { id: '2.003', label: 'Keesler AFB (KBAD)', instlid: 'KBAD', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/keesler_afb/', buildingsearch: 'false', xmin: '-9906100', ymin: '3552600', xmax: '-9891100', ymax: '3559100' }
                        , { id: '2.004', label: 'Lackland AFB-Kelly Field Annex, TX (KSKF)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/lackland_afb/', instlid: 'KSKF', comment: '', buildingsearch: 'false', xmin: '-10979701.4517', ymin: '3421037.6727', xmax: '-10967509.7457', ymax: '3428614.4931' }
                        , { id: '2.005', label: 'Laughlin AFB (MXDP)', instlid: 'MXDP', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/laughlin_afb/', buildingsearch: 'false', xmin: '-11227500', ymin: '3418000', xmax: '-11212500', ymax: '3424400' }
                        , { id: '2.006', label: 'Luke AFB (NUEX)', instlid: 'NUEX', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/luke_afb/', buildingsearch: 'false', xmin: '-12517700', ymin: '3963200', xmax: '-12502700', ymax: '3969600' }
                        , { id: '2.007', label: 'Maxwell AFBL (PNQS)', instlid: 'PNQS', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/maxwell_afb/', comment: '', buildingsearch: 'false', xmin: '-9643300', ymin: '3799400', xmax: '-9583300', ymax: '3825200' }
                        , { id: '2.008', label: 'Randolph AFB (TYMX)', instlid: 'TYMX', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/randolph_afb/', comment: '', buildingsearch: 'false', xmin: '-10956100', ymin: '3436500', xmax: '-10926100', ymax: '3449400' }
                        , { id: '2.009', label: 'Sheppard AFB (VNVP)', instlid: 'VNVP', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/sheppard_afb/', comment: '', buildingsearch: 'false', xmin: '-10980700', ymin: '4019900', xmax: '-10950700', ymax: '4032800' }
                        , { id: '2.01', label: 'Vance AFB (XTLF)', instlid: 'XTLF', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/vance_afb/', comment: '', buildingsearch: 'false', xmin: '-10915500', ymin: '4341200', xmax: '-10885500', ymax: '4354100' }


            ]
        }, {
            label: '<b>AFDW</b>',
            id: '3',
            xmin: '-17699685.9057',
            ymin: '1469491.4861',
            xmax: '-4501151.3577',
            ymax: '7966027.3941',
            children: [

                     { id: '3.002', label: 'Andrews AFB (AJXF)', comment: '', instlid:'AJXF', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/andrews_afb/', buildingsearch: 'false', xmin: '-8565100', ymin: '4691000', xmax: '-8550100', ymax: '4697400' }
                    , { id: '3.003', label: 'Bolling AFB (KADW)', comment: '', instlid: 'KADW', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/bolling_afb/', buildingsearch: 'false', xmin: '-8590000', ymin: '4692300', xmax: '-8560000', ymax: '4705200' }


            ]
        }, {
            label: '<b>AFGSC</b>',
            id: '4',
            xmin: '-17699685.9057',
            ymin: '1469491.4861',
            xmax: '-4501151.3577',
            ymax: '7966027.3941',
            children: [

                      { id: '4.002', label: 'Barksdale AFB (KBAD)', instlid: 'KBAD', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/barksdale_afb/', comment: '', buildingsearch: 'false', xmin: '-10433299.8857', ymin: '3822471.0034', xmax: '-10406661.5813', ymax: '3835541.7352' }
                    , { id: '4.003', label: 'Dyess AFB (FNWZ)',  dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/dyess_afb/', comment: 'Air Combat Command', buildingsearch: 'true', instlid: 'FNWZ', xmin: '-11127546.7428', ymin: '3812321.0518', xmax: '-11100908.4384', ymax: '3825391.7836' }
                    , { id: '4.004', label: 'Ellsworth AFB (FXBM)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/ellsworth_afb/', comment: 'Air Combat Command', buildingsearch: 'true', instlid: 'FXBM', xmin: '-11482705.7545', ymin: '5484943.1231', xmax: '-11470045.8717', ymax: '5491507.1529' }
                    , { id: '4.005', label: 'F.E. Warren AFB (KFEW)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/fe_warren_afb/', instlid: 'KFEW', comment: '', buildingsearch: 'false', xmin: '-11689200', ymin: '5030400', xmax: '-11659200', ymax: '5043300' }
                    , { id: '4.006', label: 'Malmstrom AFB (KGFA)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/malmstrom_afb/', instlid: 'KGFA', comment: '', buildingsearch: 'false', xmin: '-12391800', ymin: '6018500', xmax: '-12361800', ymax: '6031400' }
                    , { id: '4.007', label: 'Minot AFB ACC (QJVF)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/minot_afb/', instlid: 'QJVF', comment: '', buildingsearch: 'false', xmin: '-11288112.2427', ymin: '6172814.1503', xmax: '-11275452.3599', ymax: '6179378.1801' }
                    , { id: '4.008', label: 'Whiteman AFB AFGSC (KSZL)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/whiteman_afb/', instlid: 'KSZL', comment: '', buildingsearch: 'false', xmin: '-10429700', ymin: '4676700', xmax: '-10399700', ymax: '4689600' }


            ]

        }, {
            label: '<b>AFMC</b>',
            id: '5',
            xmin: '-17699685.9057',
            ymin: '1469491.4861',
            xmax: '-4501151.3577',
            ymax: '7966027.3941',
            children: [
                         { id: '5.002', label: 'Arnold AFB (ANZY)', instlid:'ANZY', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/arnold_afb/', comment: '', buildingsearch: 'true', xmin: '-9621000', ymin: '4198900', xmax: '-9548400', ymax: '4232500' }
                        , { id: '5.003', label: 'Brooks City Base (CNBC)', instlid: 'CNBC', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/brooks_city_afb/', comment: '', buildingsearch: 'true', xmin: '-10979800', ymin: '3411800', xmax: '-10943600', ymax: '3428600' }
                        , { id: '5.004', label: 'Edwards AFB (FSPM)', instlid: 'FSPM', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/edwards_afb/', comment: '', buildingsearch: 'true', xmin: '-13198000', ymin: '4117000', xmax: '-13053000', ymax: '4184000' }
                        , { id: '5.005', label: 'Eglin AFB (FTFA)', instlid: 'FTFA', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/eglin_afb/', comment: '', buildingsearch: 'true', xmin: '-9652200', ymin: '3557900', xmax: '-9615900', ymax: '3574700' }
                        , { id: '5.006', label: 'Hanscom AFB (MXRD)', instlid: 'MXRD', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/hanscom_afb/', comment: '', buildingsearch: 'true', xmin: '-10429700', ymin: '4676700', xmax: '-10399700', ymax: '4689600' }
                        , { id: '5.007', label: 'Hill AFB (KRSM)', instlid: 'KRSM', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/hill_afb/', buildingsearch: 'true', xmin: '-12485300', ymin: '5023200', xmax: '-12449000', ymax: '5039900' }
                        , { id: '5.008', label: 'Kirtland AFB (MHMV)', instlid: 'MHMV', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/kirtland_afb/', buildingsearch: 'true', xmin: '-11891200', ymin: '4147700', xmax: '-11818600', ymax: '4181300' }
                        , { id: '5.009', label: 'Robins AFB (UHHZ)', instlid: 'UHHZ', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/robins_afb/', buildingsearch: 'true', xmin: '-9322800', ymin: '3836200', xmax: '-9286500', ymax: '3852900' }
                        , { id: '5.01', label: 'Tinker AFB (WWYK)', instlid: 'WWYK', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/tinker_afb/', buildingsearch: 'true', xmin: '-10859900', ymin: '4211600', xmax: '-10823600', ymax: '4228400' }
                        , { id: '5.011', label: 'Wright Patterson AFB (ZHTV)', instlid: 'ZHTV', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/wright_patterson_afb/', buildingsearch: 'true', xmin: '-9374700', ymin: '4831200', xmax: '-9338400', ymax: '4848000' }


            ]
        }, {
            label: '<b>AFRC</b>',
            id: '6',
            xmin: '-17699685.9057',
            ymin: '1469491.4861',
            xmax: '-4501151.3577',
            ymax: '7966027.3941',
            children: [
                     { id: '6.002', label: 'Dobbins ARB AFRC (FGWB)', instlid: 'FGWB', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/dobbins_arb/', comment: '', buildingsearch: 'false', xmin: '-9412148.9731', ymin: '4015113.7785', xmax: '-9405288.7498', ymax: '4018362.3522' }
                    , { id: '6.003', label: 'Grissom ARB AFRC (CTGB)', instlid: 'CTGB', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/grissom_arb/', buildingsearch: 'false', xmin: '-9596814.8552', ymin: '4958359.1405', xmax: '-9583094.4086', ymax: '4964856.2879' }
                    , { id: '6.004', label: 'Homestead ARB (KYJM)', instlid: 'KYJM', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/homestead_arb/', buildingsearch: 'false', xmin: '-8958800', ymin: '2931500', xmax: '-8940600', ymax: '2939800' }
                    , { id: '6.005', label: 'March ARB AFRC (PDPG)', instlid: 'PDPG', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/march_arb/', buildingsearch: 'false', xmin: '-13059977.0101', ymin: '4010039.674', xmax: '-13046256.5635', ymax: '4016536.8214' }
                    , { id: '6.006', label: 'Minneapolis - St. Paul AFRC (QJKL)', instlid: 'QJKL', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/minneapolis_st_paul_ars/', comment: '', buildingsearch: 'false', xmin: '-10384005.742', ymin: '5599400.012', xmax: '-10370285.2954', ymax: '5605897.1594' }
                    , { id: '6.007', label: 'Niagara Falls ARS AFRC (RVKQ)', instlid: 'RVKQ', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/niagara_falls_ars/', comment: '', buildingsearch: 'false', xmin: '-8791742.7686', ymin: '5326638.9989', xmax: '-8784882.5454', ymax: '5329887.5726' }
                    , { id: '6.008', label: 'Pittsburgh ARS AFRC (JLSS)', instlid: 'JLSS', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/pittsburg_ars/', comment: '', buildingsearch: 'false', xmin: '-8934428.4683', ymin: '4935834.9086', xmax: '-8927568.245', ymax: '4939083.4823' }
                    , { id: '6.009', label: 'Westover ARB AFRC (YTPM)', instlid: 'YTPM', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/westover_arb/', buildingsearch: 'false', xmin: '-8082705.9741', ymin: '5186641.5318', xmax: '-8068985.5275', ymax: '5193138.6792' }
                    , { id: '6.01', label: 'Youngstown ARS AFRC (ZQEL)', instlid: 'ZQEL', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/youngstown_ars/', buildingsearch: 'false', xmin: '-8984356.3094', ymin: '5049798.9383', xmax: '-8977496.0861', ymax: '5053047.512' }


            ]
        }, {
            label: '<b>AFRICOM</b>',
            id: '7',
            xmin: '-12228754.9439',
            ymin: '-6547436.8561',
            xmax: '15870719.6462',
            ymax: '6758721.0278',
            dataurl: 'https://www.my.af.mil/accgeolib/africom',
            children: [

                          { id: '7.002', label: '<b><i>-Algeria</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/africom/algeria', comment: '', buildingsearch: 'false', xmin: '90765.4583', ymin: '2636839.4662', xmax: '1846982.6202', ymax: '3468474.3339' }
                        , { id: '7.003', label: '   Bou Sfer', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/africom/bou_sfer/', buildingsearch: 'false', xmin: '-93329', ymin: '4261990', xmax: '-86720', ymax: '4265896' }
                        , { id: '7.004', label: '   In Amenas (DAUZ)', dataurl: 'https://www.my.af.mil/accgeolib/africom/fort_thiriet/', instlid: 'DAUZ', comment: '', buildingsearch: 'false', xmin: '1066349.9603', ymin: '3252974.8344', xmax: '1080070.4069', ymax: '3259471.9818' }
                        , { id: '7.005', label: '<b><i>-Ascension Island</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/africom/ascension_island/', comment: '', buildingsearch: 'false', xmin: '-1612267.1612', ymin: '-893601.6075', xmax: '-1584826.268', ymax: '-880607.3127' }
                        , { id: '7.006', label: '   Ascension Island (FHAW)', instlid: 'FHAW', dataurl: 'https://www.my.af.mil/accgeolib/africom/ascension_island/', comment: '', buildingsearch: 'false', xmin: '-1604020.7527', ymin: '-890268.2856', xmax: '-1602305.6969', ymax: '-889456.1422' }
                        , { id: '7.007', label: '<b><i>-Djibouti</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/africom/djibouti/', comment: '', buildingsearch: 'false', xmin: '4753750', ymin: '1263575', xmax: '4844701', ymax: '1322180' }
                        , { id: '7.008', label: '   Chebelley (HDCH)', dataurl: 'https://www.my.af.mil/accgeolib/africom/djibouti/chebelley/', instlid: 'HDCH', comment: '', buildingsearch: 'false', xmin: '4791037', ymin: '1288819', xmax: '4796507', ymax: '1292794' }
                        , { id: '7.009', label: '   Djibouti Ambouli (HDAM)', dataurl: 'https://www.my.af.mil/accgeolib/africom/djibouti/djibouti_ambouli/', instlid: 'HDAM', comment: '', buildingsearch: 'false', xmin: '4797179', ymin: '1289627', xmax: '4810025', ymax: '1297905' }
                        , { id: '7.01', label: '<b><i>-Kenya</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/africom/kenya/', comment: '', buildingsearch: 'false', xmin: '3439929.1074', ymin: '-298357.9596', xmax: '5196146.2693', ymax: '533276.9081' }
                        , { id: '7.011', label: '   Kenya Mombasa Moi INTL (HKMO)', dataurl: 'https://www.my.af.mil/accgeolib/africom/kenya/', instlid: 'HKMO', comment: '', buildingsearch: 'false', xmin: '4404878.8032', ymin: '-450575.1062', xmax: '4410974.6562', ymax: '-446686.3724' }
                        , { id: '7.012', label: '   Jomo Kenyata INTL (HKJK)', dataurl: 'https://www.my.af.mil/accgeolib/africom/kenya/', instlid: 'HKJK', comment: '', buildingsearch: 'false', xmin: '4104107.0109', ymin: '-150742.4311', xmax: '4116136.2882', ymax: '-142802.5348' }
                        , { id: '7.013', label: '<b><i>-Somalia</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/africom/somalia/', comment: '', buildingsearch: 'false', xmin: '3292761.0746', ymin: '-198699.2061', xmax: '6805195.3984', ymax: '1464570.5294' }
                        , { id: '7.014', label: '   Somalia Mogadishu INTL (HCMM)', dataurl: 'https://www.my.af.mil/accgeolib/africom/somalia/', instlid: 'HCMM', comment: '', buildingsearch: 'false', xmin: '5032543.196', ymin: '215353.0182', xmax: '5056926.608', ymax: '230907.9534' }

            ]
        }, {
            label: '<b>AFSOC</b>',
            id: '8',
            xmin: '-17699685.9057',
            ymin: '1469491.4861',
            xmax: '-4501151.3577',
            ymax: '7966027.3941',
            children: [

                         { id: '8.002', label: 'Cannon AFB (CZQZ)', comment: '', instlid: 'CZQZ', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/cannon_afb/', layerGroupName: 'AFSOC_CIP', buildingsearch: 'true', xmin: '-11510400', ymin: '4076600', xmax: '-11492300', ymax: '4085000', numberFields: 'FACIL_ID', nameFields: 'STRUCTNAME', instIDFields: 'INSTALL', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/cannon_afb/', url: 'https://maps.acc.af.mil/geobase/rest/services/AFSOC/AFSOC_CIP/MapServer', layerIds: '122', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${STRUCTNAME}<br/><b>Facility ID: </b>${FACIL_ID}<br/><b>Status: </b>${STR_STAT_D}<br/><b>Use: </b>${STR_USE_D}<br/><br>Address: </br>${ADDRESS}</br><a href="../Hyperlink/building.aspx?rid=${FACIL_ID}&LAYER=BUILDINGS&INSTALL=${INSTALL}" target="_blank"><b>View Additional Building Info</b></a>' }
                   , { id: '8.003', label: 'Hurlburt Field (FTEV)', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/hurlburt_field/', instlid: 'FTEV', layerGroupName: 'AFSOC_CIP', buildingsearch: 'true', xmin: '-9660700', ymin: '3552400', xmax: '-9642500', ymax: '3560800', numberFields: 'FACIL_ID', nameFields: 'STRUCTNAME', instIDFields: 'INSTALL', url: 'https://maps.acc.af.mil/geobase/rest/services/AFSOC/AFSOC_CIP/MapServer', layerIds: '122', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${STRUCTNAME}<br/><b>Facility ID: </b>${FACIL_ID}<br/><b>Status: </b>${STR_STAT_D}<br/><b>Use: </b>${STR_USE_D}<br/><br>Address: </br>${ADDRESS}</br><a href="../Hyperlink/building.aspx?rid=${FACIL_ID}&LAYER=BUILDINGS&INSTALL=${INSTALL}" target="_blank"><b>View Additional Building Info</b></a>' }



            ]
        }, {
            label: '<b>AFSPC</b>',
            id: '9',
            xmin: '-17699685.9057',
            ymin: '1469491.4861',
            xmax: '-4501151.3577',
            ymax: '7966027.3941',
            children: [

                         { id: '9.002', label: 'Buckley AFB (CRWU)', comment: '', instlid: 'CRWU', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/buckley_afb/', buildingsearch: 'false', xmin: '-11671500', ymin: '4818600', xmax: '-11653100', ymax: '4827400' }
                        , { id: '9.003', label: 'Cape Canaveral AFS', comment: '',  dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/cape_canaveral_afs/', buildingsearch: 'false', xmin: '-9003000', ymin: '3290200', xmax: '-8929600', ymax: '3325400' }
                        , { id: '9.004', label: 'Cape Code AFS', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/cape_cod_afs/', buildingsearch: 'false', xmin: '-7871500', ymin: '5116900', xmax: '-7834800', ymax: '5134500' }
                        , { id: '9.005', label: 'Cavalier AFS', comment: '',  dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/cavalier_afs/', buildingsearch: 'false', xmin: '-10907600', ymin: '6225300', xmax: '-10889200', ymax: '6234100' }
                        , { id: '9.006', label: 'Cheyenne Mountain AFS (WMSJ)', comment: '', instlid: 'WMSJ', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/cheyenne_mountain_afs/', buildingsearch: 'false', xmin: '-11680700', ymin: '4679900', xmax: '-11662300', ymax: '4688700' }
                        , { id: '9.007', label: 'Clear AFS (DXEB) ', instlid: 'DXEB', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/clear_afs/', buildingsearch: 'false', xmin: '-16645700', ymin: '9405600', xmax: '-16572400', ymax: '9440800' }
                        , { id: '9.008', label: 'Los Angeles AFB (ACJP)', instlid: 'ACJP', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/los_angeles_afb/', comment: '', buildingsearch: 'false', xmin: '-13200300', ymin: '4012200', xmax: '-13163700', ymax: '4029800' }
                        , { id: '9.009', label: 'New Boston AFS', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/new_boston_afs/', comment: '', buildingsearch: 'false', xmin: '-7993500', ymin: '5293800', xmax: '-7956800', ymax: '5311400' }
                        , { id: '9.010', label: 'Patrick AFB (SXHT)', instlid: 'SXHT', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/patrick_afb/', comment: '', buildingsearch: 'false', xmin: '-8992200', ymin: '3270800', xmax: '-8955500', ymax: '3288400' }
                        , { id: '9.011', label: 'Peterson AFB (TDKA)', instlid: 'TDKA', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/peterson_afb/', comment: '', buildingsearch: 'false', xmin: '-11673800', ymin: '4685800', xmax: '-11637100', ymax: '4703400' }
                        , { id: '9.012', label: 'Schriever AFB (GLEN)', instlid: 'GLEN', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/schriever_afb/', comment: '', buildingsearch: 'false', xmin: '-11644800', ymin: '4688900', xmax: '-11626400', ymax: '4697700' }
                        , { id: '9.013', label: 'Vandenburg AFB (XUMU)', instlid: 'XUMU', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/vandenburg_afb/', comment: '', buildingsearch: 'false', xmin: '-13460600', ymin: '4109700', xmax: '-13387300', ymax: '4144800' }


            ]

        }, {
            label: '<b>AMC</b>',
            id: '10',
            xmin: '-17699685.9057',
            ymin: '1469491.4861',
            xmax: '-4501151.3577',
            ymax: '7966027.3941',
            children: [
                         { id: '10.001', label: 'Dover AFB (FJXT)', instlid: 'FJXT', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/dover_afb/', comment: 'Air Mobility Command', buildingsearch: 'false', xmin: '-8407785.0305', ymin: '4736680.2878', xmax: '-8394895.8366', ymax: '4743215.6537' }
                        , { id: '10.002', label: 'Fairchild AFB (GJKZ)', instlid: 'GJKZ', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/fairchild_afb/', comment: 'Air Mobility Command', buildingsearch: 'false', xmin: '-13110053.1051', ymin: '6037182.1296', xmax: '-13084274.7173', ymax: '6049870.6763' }
                        , { id: '10.003', label: 'Grand Forks AFB (JFSD)', instlid: 'JFSD', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/grand_forks_afb/', comment: 'Air Mobility Command', buildingsearch: 'false', xmin: '-10854678.5282', ymin: '6093636.333', xmax: '-10828900.1404', ymax: '6106707.0648' }
                        , { id: '10.004', label: 'Joint Base Charleston (DKFX)', instlid: 'DKFX', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/charleston_afb/', comment: 'Air Mobility Command', buildingsearch: 'false', xmin: '-8918573.9902', ymin: '3879221.0673', xmax: '-8905684.7963', ymax: '3885756.4332' }
                        , { id: '10.005', label: 'Joint Base Lewis-McChord Field (PQWY)', instlid: 'PQWY', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/mcchord_afb/', comment: '', buildingsearch: 'false', xmin: '-13650409.4648', ymin: '5956588.8192', xmax: '-13624631.077', ymax: '5969659.551' }
                        , { id: '10.006', label: 'Joint Base McGuire-Dix-Lakehurst (PTFL)', instlid: 'FJXT', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/mcguire_afb/', comment: 'Air Mobility Command', buildingsearch: 'false', xmin: '-8310339.6383', ymin: '4866144.2416', xmax: '-8297450.4444', ymax: '4872679.6075' }
                        , { id: '10.007', label: 'Lakehurst Runways',  dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/lakehurst_nas/', comment: '', buildingsearch: 'false', xmin: '-8278449.4963', ymin: '4870078.3797', xmax: '-8275442.177', ymax: '4872118.2929' }
                        , { id: '10.008', label: 'Little Rock AFB (NKAK)', instlid: 'NKAK', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/little_rock_afb/', comment: 'Air Mobility Command', buildingsearch: 'false', xmin: '-10263858.3797', ymin: '4147995.7917', xmax: '-10250969.1858', ymax: '4154340.065' }
                        , { id: '10.009', label: 'MacDill AFB (NVZR)', instlid: 'NVZR', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/macdill_afb/', comment: 'Air Mobility Command', buildingsearch: 'false', xmin: '-9191224.6412', ymin: '3226186.1965', xmax: '-9178335.4473', ymax: '3232530.4698' }
                        , { id: '10.01', label: 'McConnell AFB (PRQE)', instlid: 'PRQE', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/mcconnell_afb/', comment: 'Air Mobility Command', buildingsearch: 'false', xmin: '-10832621.2', ymin: '4522962.9', xmax: '-10819861', ymax: '4529288.0' }
                        , { id: '10.011', label: 'Scott AFB (VDYD)', instlid: 'VDYD', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/scott_afb/', comment: 'Air Mobility Command', buildingsearch: 'false', xmin: '-10008613.7076', ymin: '4652807.5761', xmax: '-9995724.5137', ymax: '4659151.8494' }
                        , { id: '10.012', label: 'Travis AFB (XDAT)', instlid: 'XDAT', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/travis_afb/', comment: 'Air Mobility Command', buildingsearch: 'false', xmin: '-13588371.0161', ymin: '4610419.6722', xmax: '-13562592.6283', ymax: '4623490.404' }

            ]

        }, {
            label: '<b>EUCOM</b>',
            id: '12',
            xmin: '-6145488.315',
            ymin: '3421866.2855',
            xmax: '7904248.9801',
            ymax: '10074945.2274',
            children: [

                         { id: '12.002', label: '<b><i>- Azores</b></i>', comment: '', buildingsearch: '', xmin: '-3056709.6192', ymin: '4669130.3258', xmax: '-3001827.8329', ymax: '4695118.9154' }
                        , { id: '12.003', label: '  -- Lajes Field (LPLA)', comment: '', buildingsearch: '', xmin: '-3026774.968', ymin: '4680452.5606', xmax: '-3002716.4134', ymax: '4696332.3532' }
                        , { id: '12.004', label: '<b><i>- Crete</b></i>', comment: '', buildingsearch: '', xmin: '2552966.846', ymin: '4088548.145', xmax: '2992021.1365', ymax: '4296456.862' }
                        , { id: '12.005', label: '  -- Souda Bay NAS (LGSA)', comment: '', buildingsearch: '', xmin: '2685100.1941', ymin: '4234140.4801', xmax: '2691114.8328', ymax: '4238119.9829' }
                        , { id: '12.006', label: '<b><i>- Cyprus</b></i>', comment: '', buildingsearch: '', xmin: '3487292.5957', ymin: '4083884.9376', xmax: '3926346.8862', ymax: '4291793.6546' }
                        , { id: '12.007', label: '  -- Akrotiri AirBase (LCRA)', comment: '', buildingsearch: '', xmin: '3665914.7898', ymin: '4102563.2759', xmax: '3677944.0671', ymax: '4110503.1722' }
                        , { id: '12.008', label: '  -- Larnaca INTL (LCLK)', comment: '', buildingsearch: '', xmin: '3739414.4673', ymin: '4144949.1364', xmax: '3745429.106', ymax: '4148919.0846' }
                        , { id: '12.009', label: '<b><i>- France</b></i>', comment: '', buildingsearch: '', xmin: '546446.7343', ymin: '5389657.0039', xmax: '552542.5873', ymax: '5393445.4141' }
                        , { id: '12.01', label: '  -- Istres, France (LFMI)', comment: '', buildingsearch: '', xmin: '546446.7343', ymin: '5389657.0039', xmax: '552542.5873', ymax: '5393445.4141' }
                        , { id: '12.011', label: '<b><i>- Germany</b></i>', comment: '', buildingsearch: '', xmin: '286704.6869', ymin: '6272289.253', xmax: '2042921.8488', ymax: '7103924.1207' }
                        , { id: '12.012', label: '  -- Ramstein AB (ETAR)', comment: 'USAFE', buildingsearch: '', xmin: '842669.9072', ymin: '6348908.7228', xmax: '849095.3949', ymax: '6351521.9137' }
                        , { id: '12.013', label: '  -- Spangdahlem AirBase (ETAD)', comment: 'USAFE', buildingsearch: '', xmin: '742628.8431', ymin: '6440307.8229', xmax: '748643.4818', ymax: '6444277.771' }
                        , { id: '12.014', label: '<b><i>- Israel</b></i>', comment: '', buildingsearch: '', xmin: '2987616.9563', ymin: '3296512.8957', xmax: '4743834.1182', ymax: '4128147.7634' }
                        , { id: '12.015', label: '  -- Ben Gurion INTL (LLBG)', comment: '', buildingsearch: '', xmin: '3879996.9797', ymin: '3762717.0086', xmax: '3886011.6184', ymax: '3766686.9568' }
                        , { id: '12.016', label: '  -- Hatzor AirBase (LLHS)', comment: '', buildingsearch: '', xmin: '3862696.4606', ymin: '3729767.1098', xmax: '3868711.0992', ymax: '3733737.0579' }
                        , { id: '12.017', label: '  -- Nevatim AirBase (LLNV)', comment: '', buildingsearch: '', xmin: '3885123.5844', ymin: '3651004.6525', xmax: '3909182.1391', ymax: '3666884.4451' }
                        , { id: '12.018', label: '<b><i>- Italy</b></i>', comment: '', buildingsearch: '', xmin: '-92670.68', ymin: '4154819', xmax: '2715319.99', ymax: '6199663' }
                        , { id: '12.019', label: '  -- Aviano AB (LIPA)', comment: '', buildingsearch: '', xmin: '1397864', ymin: '5782837', xmax: '1406629', ymax: '5788017' }
                        , { id: '12.02', label: '<b><i>- Bulgaria</b></i>', comment: '', buildingsearch: '', xmin: '2386230.0298', ymin: '5031401.6239', xmax: '3264338.6108', ymax: '5447219.0578' }
                        , { id: '12.021', label: '  -- Burgas INTL (LBBG)', comment: '', buildingsearch: '', xmin: '3059537.5368', ymin: '5244658.5442', xmax: '3065552.1754', ymax: '5248638.0469' }
                        , { id: '12.022', label: '<b><i>- Romania</b></i>', comment: '', buildingsearch: '', xmin: '1925161.8752', ymin: '5317581.8578', xmax: '3681379.0371', ymax: '6149216.7256' }
                        , { id: '12.023', label: '  -- Henri Coanda INTL (LROP)', comment: '', buildingsearch: '', xmin: '2898540.5541', ymin: '5550712.5231', xmax: '2910569.8314', ymax: '5558671.5287' }
                        , { id: '12.024', label: '  -- Mihail Kogalniceanu, Romania (LRCK)', comment: '', buildingsearch: '', xmin: '3165224.204', ymin: '5517863.8128', xmax: '3177415.91', ymax: '5525440.6332' }
                        , { id: '12.025', label: '<b><i>- Spain</b></i>', comment: '', buildingsearch: '', xmin: '-1142378.3738', ymin: '4500733.904', xmax: '613838.7881', ymax: '5332368.7717' }
                        , { id: '12.026', label: '  -- Moron AirBase (LEMO)', comment: '', buildingsearch: '', xmin: '-631460.8687', ymin: '4459584.5812', xmax: '-619431.5914', ymax: '4467524.4775' }
                        , { id: '12.027', label: '  -- Rota NAS (LERT)', comment: 'USAFE', buildingsearch: '', xmin: '-709857.1903', ymin: '4387355.8238', xmax: '-703842.5516', ymax: '4391325.772' }
                        , { id: '12.028', label: '<b><i>- Turkey</b></i>', comment: '', buildingsearch: '', xmin: '3110222.9584', ymin: '4247613.9233', xmax: '4866440.1203', ymax: '5079248.791' }
                        , { id: '12.029', label: '  -- Batman AB (LTCJ)', comment: '', buildingsearch: '', xmin: '4572037', ymin: '4566560', xmax: '4582195', ymax: '4572564' }
                        , { id: '12.03', label: '  -- Cigli AirBase (LTBL)', comment: '', buildingsearch: '', xmin: '3000134.5179', ymin: '4647200.955', xmax: '3012163.7952', ymax: '4655140.8513' }
                        , { id: '12.031', label: '  -- Diyarbakir (LTCC)', comment: '', buildingsearch: '', xmin: '4469258', ymin: '4560819', xmax: '4481248', ymax: '4567906' }
                        , { id: '12.032', label: '  -- Esenboga INTL (LTAC)', comment: '', buildingsearch: '', xmin: '3666448.732', ymin: '4880250.2116', xmax: '3678478.0093', ymax: '4888209.2172' }
                        , { id: '12.033', label: '  -- Incirlik AirBase (LTAG)', comment: '', buildingsearch: '', xmin: '3940600.0627', ymin: '4437059.7191', xmax: '3946614.7014', ymax: '4441029.6672' }
                        , { id: '12.034', label: '<b><i>- United Kingdom</b></i>', comment: '', buildingsearch: '', xmin: '-2250380.3071', ymin: '6293535.4643', xmax: '1262054.0167', ymax: '7956805.1998' }
                        , { id: '12.035', label: '  -- RAF Lakenheath (EGUL)', comment: 'USAFE', buildingsearch: '', xmin: '55807.8991', ymin: '6871440.8788', xmax: '68658.8744', ymax: '6876667.2606' }
                        , { id: '12.036', label: '  -- RAF Mildenhall (EGUN)', comment: 'USAFE', buildingsearch: '', xmin: '50344.4112', ymin: '6864786.429', xmax: '56769.8989', ymax: '6867399.6199' }


            ]

        }, {
            label: '<b>PACOM</b>',
            id: '13',
            xmin: '4339981.7104',
            ymin: '-3938696.933',
            xmax: '32439456.3005',
            ymax: '9367460.9509',
            children: [

                         { id: '13.002', label: '<b><i>- Alaska</b></i>', comment: '', buildingsearch: 'false', xmin: '-25014544.3806', ymin: '5574619.979', xmax: '-10964807.0855', ymax: '12227698.9209' }
                        , { id: '13.003', label: '   Eielson AFB (PAEI)', comment: '', buildingsearch: 'false', xmin: '-16388552.4939', ymin: '9513556.966', xmax: '-16364493.9393', ymax: '9529436.7586' }
                        , { id: '13.004', label: '   Elmendorf AFB (PAED)', comment: '', buildingsearch: 'false', xmin: '-16683967.4417', ymin: '8679881.3052', xmax: '-16671938.1644', ymax: '8687821.2015' }
                        , { id: '13.005', label: '<b><i>- Australia</b></i>', comment: '', buildingsearch: 'false', xmin: '-28618605.5196', ymin: '-5121815.5227', xmax: '-21593736.872', ymax: '-1795276.0518' }
                        , { id: '13.006', label: '   Alice Springs Airport (YBAS)', comment: '', buildingsearch: 'false', xmin: '-25172449.064', ymin: '-2731881.6713', xmax: '-25166353.211', ymax: '-2727992.9375' }
                        , { id: '13.007', label: '   Darwin INTL (YPDN)', comment: '', buildingsearch: 'false', xmin: '-25508659.5915', ymin: '-1394949.2795', xmax: '-25502563.7385', ymax: '-1391060.5457' }
                        , { id: '13.008', label: '   Pearce RAAF Base (YPEA)', comment: '', buildingsearch: 'false', xmin: '-27163223.9969', ymin: '-3722228.4849', xmax: '-27157128.1439', ymax: '-3718339.7511' }
                        , { id: '13.009', label: '   Richmond RAAF Base (YSRI)', comment: '', buildingsearch: 'false', xmin: '-23291604.2793', ymin: '-3976709.4444', xmax: '-23288556.3528', ymax: '-3974765.0775' }
                        , { id: '13.01', label: '<b><i>- Guam</b></i>', comment: '', buildingsearch: 'false', xmin: '-24012535.3366', ymin: '1483382.6608', xmax: '-23902771.764', ymax: '1535359.8401' }
                        , { id: '13.011', label: '   Andersen AFB (PGUA)', comment: '', buildingsearch: 'false', xmin: '16130106.4721', ymin: '1524869.5488', xmax: '16136966.6953', ymax: '1528185.005' }
                        , { id: '13.012', label: '<b><i>- Hawaii</b></i>', comment: '', buildingsearch: 'false', xmin: '-17993871.2355', ymin: '2139857.6336', xmax: '-17115762.6545', ymax: '2555675.0674' }
                        , { id: '13.013', label: '   Hickam AFB (PHIK)', comment: '', buildingsearch: 'false', xmin: '-17586754.1983', ymin: '2426029.484', xmax: '-17574724.9209', ymax: '2433969.3803' }
                        , { id: '13.014', label: '<b><i>- Indian Ocean</b></i>', comment: '', buildingsearch: 'false', xmin: '1035896.8955', ymin: '-4142868.2331', xmax: '15085634.1905', ymax: '2510210.7089' }
                        , { id: '13.015', label: '   Diego Garcia NSF (FJDG)', comment: '', buildingsearch: 'false', xmin: '8057717.6165', ymin: '-818222.9672', xmax: '8063813.4695', ymax: '-814434.557' }
                        , { id: '13.016', label: '<b><i>- Japan</b></i>', comment: '', buildingsearch: 'false', xmin: '-26690930.3068', ymin: '3622398.7076', xmax: '-23178495.9831', ymax: '5285668.4431' }
                        , { id: '13.017', label: '   Iwo Jima AirBase (RJAW)', comment: '', buildingsearch: 'false', xmin: '15724878.7151', ymin: '2845633.3529', xmax: '15738599.1616', ymax: '2852264.2651' }
                        , { id: '13.018', label: '   Kadena AirBase (RODN)', comment: '', buildingsearch: 'false', xmin: '14219105.8757', ymin: '3041057.4404', xmax: '14225120.5143', ymax: '3045036.9432' }
                        , { id: '13.019', label: '   Misawa AirBase (RJSM)', comment: '', buildingsearch: 'false', xmin: '-24341116.2006', ymin: '4966871.0952', xmax: '-24335020.3476', ymax: '4970759.8291' }
                        , { id: '13.02', label: '   Yokota AirBase (RJTY)', comment: '', buildingsearch: 'false', xmin: '15509154.2806', ymin: '4264174.9666', xmax: '15515250.1336', ymax: '4267963.3768' }
                        , { id: '13.021', label: '<b><i>- North Korea</b></i>', comment: '', buildingsearch: 'false', xmin: '13305378.0742', ymin: '4426242.114', xmax: '15061595.2361', ymax: '5257876.9817' }
                        , { id: '13.022', label: '   PyongYang INTL (ZKPY)', comment: '', buildingsearch: 'false', xmin: '13975778.5854', ymin: '4746226.6236', xmax: '13999837.1401', ymax: '4761781.5589' }
                        , { id: '13.023', label: '<b><i>- Pacific Ocean</b></i>', comment: ' ', buildingsearch: 'false', xmin: '11525039.6148', ymin: '-1138316.6688', xmax: '25574776.9098', ymax: '5514762.2732' }
                        , { id: '13.024', label: '   Wake Island (PWAK)', comment: '', buildingsearch: 'false', xmin: '18546860.3358', ymin: '2186328.5971', xmax: '18552956.1888', ymax: '2190117.0073' }
                        , { id: '13.025', label: '<b><i>- Palau</b></i>', comment: ' ', buildingsearch: 'false', xmin: '14865800.1806', ymin: '774355.9933', xmax: '15085327.3258', ymax: '878310.3518' }
                        , { id: '13.026', label: '   Babelthuap', comment: ' ', buildingsearch: 'false', xmin: '14975414.529', ymin: '821612.1367', xmax: '14978844.6406', ymax: '823236.4236' }
                        , { id: '13.027', label: '<b><i>- South Korea</b></i>', comment: '', buildingsearch: 'false', xmin: '13797902.0898', ymin: '4123823.7002', xmax: '14676010.6707', ymax: '4539641.134' }
                        , { id: '13.028', label: '   Kunsan AirBase (RKJK)', comment: '', buildingsearch: 'false', xmin: '14089264.2361', ymin: '4283917.6377', xmax: '14101455.9421', ymax: '4291695.1053' }
                        , { id: '13.029', label: '   Osan AirBase (RKSO)', comment: '', buildingsearch: 'false', xmin: '14137822.1517', ymin: '4449850.5273', xmax: '14143918.0047', ymax: '4453638.9375' }
                        , { id: '13.03', label: '   Suwon AirBase (RKSW)', comment: '', buildingsearch: 'false', xmin: '14135141.4288', ymin: '4470694.7844', xmax: '14141237.2818', ymax: '4474583.5182' }



            ]

        }, {
            label: '<b>USAF Ranges</b>',
            id: '15',
            xmin: '-17699685.9057',
            ymin: '1469491.4861',
            xmax: '-4501151.3577',
            ymax: '7966027.3941',
            children: [

                         { id: '15.002', label: 'Avon Park', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/avon_park_range/', instlid: 'ASPR', buildingsearch: 'true', xmin: '-9112000', ymin: '3179000', xmax: '-8992000', ymax: '3231000' }
                        , { id: '15.003', label: 'Belle Fourche', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/belle_fourche_range/', comment: '', buildingsearch: 'false', xmin: '-11676000', ymin: '5552000', xmax: '-11437000', ymax: '5656000' }
                        , { id: '15.004', label: 'Claiborne', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/claiborne_range/', comment: '', buildingsearch: 'false', xmin: '-10343100', ymin: '3641000', xmax: '-10283100', ymax: '3666800' }
                        , { id: '15.005', label: 'Dare County (SUYA)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/dare_county_range/', comment: '', instlid: 'SUYA', buildingsearch: 'true', xmin: '-8477300', ymin: '4248500', xmax: '-8417300', ymax: '4274300' }
                        , { id: '15.006', label: 'Juniper Butte', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/juniper_butte_range/', comment: '', buildingsearch: 'false', xmin: '-12868000', ymin: '5192100', xmax: '-12808000', ymax: '5217900' }
                        , { id: '15.007', label: 'McGregor/Centennial', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/mcgregor_range/', comment: '', buildingsearch: 'false', xmin: '-11918000', ymin: '3748000', xmax: '-11678000', ymax: '3851000' }
                        , { id: '15.008', label: 'Melrose', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/melrose_range/', comment: '', buildingsearch: 'false', xmin: '-11584200', ymin: '4055000', xmax: '-11524200', ymax: '4080800' }
                        , { id: '15.009', label: 'Nevada Test Training Range', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/nevada_test_training/', comment: '', buildingsearch: 'false', xmin: '-13078000', ymin: '4479000', xmax: '-12838000', ymax: '4582000' }
                        , { id: '15.01', label: 'Poinsett (TKFH)', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/poinsett_range/', instlid: 'TKFH', buildingsearch: 'true', xmin: '-8989900', ymin: '3988500', xmax: '-8930000', ymax: '4014300' }
                        , { id: '15.011', label: 'Saylor Creek', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/saylor_creek_range/', buildingsearch: 'false', xmin: '-12925000', ymin: '5246000', xmax: '-12805000', ymax: '5298000' }
                        , { id: '15.012', label: 'White Sands (North)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/white_sands/', comment: '', buildingsearch: 'false', xmin: '-11971000', ymin: '3907000', xmax: '-11731000', ymax: '4010000' }
                        , { id: '15.013', label: 'White Sands (South)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/white_sands/', comment: '', buildingsearch: 'false', xmin: '-11964000', ymin: '3809000', xmax: '-11725000', ymax: '3913000' }



            ]

        }

        ]

    };
});