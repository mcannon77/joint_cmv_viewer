define([
   

], function () {

    return { 
        map: true,
     


        url: 'https://52muhj-ws-g027/geobase/rest/services/CIP/MapServer',
        layerIds: 0,
        zoomScale: 18,
        numberFields: ['buildingNumber'],
        nameFields: ['sdsFeatureName'],
        instIDFields: ['Geographic Location Code'],
        instIDFieldLike: ['buildingIDPK'],
        layerGroupName: ['CIP'],
        infoTitle: "Buildings",
        infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber}&LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>',
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
                          { id: '1.001', label: 'Beale AFB (BAEY)', comment: 'Air Combat Command', buildingsearch: 'true', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/beale_afb/', instlid: 'BAEY' , xmin: '-13539613.8963', ymin: '4725883.7815', xmax: '-13486337.2876', ymax: '4752025.2451' }
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
                          { id: '2.001', label: 'Altus AFB (AGGN)', instlid: 'AGGN', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/altus_afb/', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-11069800', ymin: '4111100', xmax: '-11039800', ymax: '4124000' }
                        , { id: '2.002', label: 'Columbus (EEPZ)', instlid: 'EEPZ', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/columbus_afb/', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-9853589', ymin: '3976158', xmax: '-9838913', ymax: '3984365' }
                        , { id: '2.003', label: 'Goodfellow AFB (JCGU)', instlid: 'JCGU', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/goodfellow_afb/', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-11185300', ymin: '3686100', xmax: '-11170300', ymax: '3692600' }
                        , { id: '2.004', label: 'JBSA - Joint Base San Antonio (JBSF)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/', instlid: 'JBSF', comment: '', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-10996932.933400000000000', ymin: '3413448.576109999800000', xmax: '-10884888.529400000000000', ymax: '3495257.327269999800000' }
                        , { id: '2.005', label: 'JBSA - Bullis (JBSF)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/', instlid: 'JBSF', comment: '', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-10980634.9327', ymin: '3453141.4099', xmax: '-10964065.3683', ymax: '3473084.4185' }
                        , { id: '2.006', label: 'JBSA - Cannon Lake (JBSF)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/', instlid: 'JBSF', comment: '', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-10934444.1907', ymin: '3487910.03239999', xmax: '-10933078.468', ymax: '3489759.35519999' }
                        , { id: '2.007', label: 'JBSA - Fort Sam Houston (JBSF)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/', instlid: 'JBSF', comment: '', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-10962708.662', ymin: '3431276.52809999', xmax: '-10954183.77', ymax: '3437832.91619999' }
                        , { id: '2.008', label: 'JBSA - Kelly Field Annex (JBSF)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/', instlid: 'JBSF', comment: '', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-10977046.8475', ymin: '3421402.41319999', xmax: '-10972367.4306', ymax: '3427786.25349999' }
                        , { id: '2.009', label: 'JBSA - Lackland AFB-Kelly Field Annex, TX (MPLS)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/lackland_afb/', instlid: 'MPSL', comment: '', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-10981139.1938', ymin: '3421841.237', xmax: '-10975371.2656', ymax: '3427799.6656' }
                        , { id: '2.01',  label: 'JBSA - Medina Annex (JBSF)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/', instlid: 'JBSF', comment: '', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-10986755.3285', ymin: '3418632.62759999', xmax: '-10980214.8154', ymax: '3426326.72629999' }
                        , { id: '2.011', label: 'JBSA - Port Annex (JBSF)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/', instlid: 'JBSF', comment: '', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-10974966.6225', ymin: '3420742.06449999', xmax: '-10969075.5547', ymax: '3426954.59919999' }
                        , { id: '2.012', label: 'JBSA - Randolph AFB (TYMX)', instlid: 'TYMX', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/randolph_afb/', comment: '', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-10943083.5424', ymin: '3439448.9895', xmax: '-10937347.3642', ymax: '3446328.17' }
                        , { id: '2.013', label: 'JBSA - Seguin Auxillary Field (JBSF)', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/', instlid: 'JBSF', comment: '', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-10900630.5454999', ymin: '3445512.7678', xmax: '-10896249.2967999', ymax: '3449899.2261' }
                        , { id: '2.014', label: 'Keesler AFB (MAHG)', instlid: 'MAHG', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/keesler_afb/', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-9906100', ymin: '3552600', xmax: '-9891100', ymax: '3559100' }
                        , { id: '2.015', label: 'Laughlin AFB (MXDP)', instlid: 'MXDP', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/laughlin_afb/', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-11227500', ymin: '3418000', xmax: '-11212500', ymax: '3424400' }
                        , { id: '2.016', label: 'Luke AFB (NUEX)', instlid: 'NUEX', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/luke_afb/', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-12517700', ymin: '3963200', xmax: '-12502700', ymax: '3969600' }
                        , { id: '2.017', label: 'Maxwell AFBL (PNQS)', instlid: 'PNQS', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/maxwell_afb/', comment: '', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-9643300', ymin: '3799400', xmax: '-9583300', ymax: '3825200' }
                        , { id: '2.018', label: 'Sheppard AFB (VNVP)', instlid: 'VNVP', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/sheppard_afb/', comment: '', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-10980700', ymin: '4019900', xmax: '-10950700', ymax: '4032800' }
                        , { id: '2.019', label: 'Vance AFB (XTLF)', instlid: 'XTLF', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/vance_afb/', comment: '', layerGroupName: 'AETC/AETC', buildingsearch: 'true', url: 'https://maps.acc.af.mil/geobase/rest/services/AETC/AETC/MapServer', layerIds: '1', numberFields: 'BUILDINGNUMBER', nameFields: 'SDSFEATURENAME', instIDFields: 'INSTALLATIONID', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${sdsFeatureName}<br/><b>Bldg Num: </b>${buildingNumber}<br/><b>Status: </b>${buildingStatus}<br/><b>Installation: </b>${Installation}<br/><a href="../Hyperlink/building.aspx?rid=${buildingNumber} &LAYER=BUILDINGS&INSTALL=${Geographic Location Code}" target="_blank"><b>View Additional Building Info</b></a>', xmin: '-10915500', ymin: '4341200', xmax: '-10885500', ymax: '4354100' }


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

                     { id: '8.002', label: 'Cannon AFB (CZQZ)', comment: '', instlid: 'CZQZ', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/cannon_afb/', layerGroupName: 'AFSOC/AFSOC', buildingsearch: 'true', xmin: '-11510400', ymin: '4076600', xmax: '-11492300', ymax: '4085000', numberFields: 'FACIL_ID', nameFields: 'STRUCTNAME', instIDFields: 'INSTALL', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/cannon_afb/', url: 'https://maps.acc.af.mil/geobase/rest/services/AFSOC/AFSOC/MapServer', layerIds: '12', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${STRUCTNAME}<br/><b>Facility ID: </b>${FACIL_ID}<br/><b>Status: </b>${STR_STAT_D}<br/><b>Use: </b>${STR_USE_D}<br/><br>Address: </br>${ADDRESS}</br><a href="../Hyperlink/building.aspx?rid=${FACIL_ID}&LAYER=BUILDINGS&INSTALL=${INSTALL}" target="_blank"><b>View Additional Building Info</b></a>' }
                   , { id: '8.003', label: 'Hurlburt Field (FTEV)', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/northcom/us/hurlburt_field/', instlid: 'FTEV', layerGroupName: 'AFSOC/AFSOC', buildingsearch: 'true', xmin: '-9660700', ymin: '3552400', xmax: '-9642500', ymax: '3560800', numberFields: 'FACIL_ID', nameFields: 'STRUCTNAME', instIDFields: 'INSTALL', url: 'https://maps.acc.af.mil/geobase/rest/services/AFSOC/AFSOC/MapServer', layerIds: '12', infoTitle: 'Building', infoContent: '<b>Bldg Name: </b>${STRUCTNAME}<br/><b>Facility ID: </b>${FACIL_ID}<br/><b>Status: </b>${STR_STAT_D}<br/><b>Use: </b>${STR_USE_D}<br/><br>Address: </br>${ADDRESS}</br><a href="../Hyperlink/building.aspx?rid=${FACIL_ID}&LAYER=BUILDINGS&INSTALL=${INSTALL}" target="_blank"><b>View Additional Building Info</b></a>' }



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
            label: '<b>CENTCOM</b>',
            id: '11',
            xmin: '2764625.6372',
            ymin: '1562962.2843',
            xmax: '9789494.2847',
            ymax: '4889501.7553',
            children: [
                          { id: '11.002', label: '<b><i>- Afghanistan</i></b></i>', comment: '', buildingsearch: 'false', dataurl: 'https://www.my.af.mil/accgeolib/centcom/afghanistan/', xmin: '6502747.4121', ymin: '3588918.0041', xmax: '8258964.574', ymax: '4420552.8718' }
                        , { id: '11.003', label: '   Bastion Airfield (OAZI)', comment: '', buildingsearch: 'false', xmin: '7146300.4176', ymin: '3741774.6908', xmax: '7152396.2706', ymax: '3745563.101' }
                        , { id: '11.004', label: '   Bagram Airfield (OAIX)', comment: '', instlid: 'OAIX', buildingsearch: 'true', dataurl: 'https://www.my.af.mil/accgeolib/centcom/afghanistan/bagram/', xmin: '7704512.8099', ymin: '4152651.1594', xmax: '7716704.5159', ymax: '4160610.165' }
                        , { id: '11.005', label: '   Dwyer', comment: '', buildingsearch: 'false', xmin: '7123494', ymin: '3639737', xmax: '7139458', ymax: '3649999' }
                        , { id: '11.006', label: '   Herat Airfield (OAHR)', comment: '', buildingsearch: 'false', xmin: '6920896.3134', ymin: '4053599.0633', xmax: '6933088.0194', ymax: '4061175.8837' }
                        , { id: '11.007', label: '   Jalalabad Airfield (OAJL)', comment: '', buildingsearch: 'false', xmin: '7844803.9387', ymin: '4080738.5993', xmax: '7850899.7917', ymax: '4084527.0095' }
                        , { id: '11.008', label: '   Kabul INTL Airport (OAKB)', comment: '', buildingsearch: 'false', xmin: '7700827.6471', ymin: '4103230.4531', xmax: '7706923.5001', ymax: '4107018.8633' }
                        , { id: '11.009', label: '   Kandahar INTL (OAKN)', comment: '', instlid: 'OAKN', buildingsearch: 'true', xmin: '7326480.127', ymin: '3696677.0178', xmax: '7332494.7657', ymax: '3700646.966' }
                        , { id: '11.01', label: '   Mazar-e-Sharif (OAMS)', comment: '', buildingsearch: 'false', xmin: '7479661.7612', ymin: '4396838.6997', xmax: '7485757.6142', ymax: '4400627.1099' }
                        , { id: '11.011', label: '   Shank FOB (OASH)', comment: '', buildingsearch: 'false', xmin: '7686512.4279', ymin: '4016691.8101', xmax: '7692608.2809', ymax: '4020480.2203' }
                        , { id: '11.012', label: '   Salerno', comment: '', buildingsearch: 'false', xmin: '7780400', ymin: '3940300', xmax: '7794900', ymax: '3947300' }
                        , { id: '11.013', label: '   Tereen AirBase (OATN)', comment: '', buildingsearch: 'false', xmin: '7330773.7395', ymin: '3841946.0822', xmax: '7333781.0588', ymax: '3843931.0563' }
                        , { id: '11.014', label: '<b><i>-Egypt</b></i>', comment: '', dataurl: 'https://www.my.af.mil/accgeolib/centcom/egypt/', buildingsearch: 'false', xmin: '2539543.8277', ymin: '2423329.9529', xmax: '4124542.0463', ymax: '4049909.9148' }
                        , { id: '11.015', label: '   Cairo INTL (HECA)', comment: '', buildingsearch: 'false', xmin: '3491601', ymin: '3515599', xmax: '3501578', ymax: '3522012' }
                        , { id: '11.016', label: '<b><i>-Iraq</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/centcom/iraq/', comment: '', buildingsearch: 'false', xmin: '3966159.3183', ymin: '3455440.4451', xmax: '5722376.4802', ymax: '4287075.3128' }
                        , { id: '11.017', label: '   Al Asad AB (ORAA)', comment: '', buildingsearch: 'false', xmin: '4709700', ymin: '3992400', xmax: '4738800', ymax: '4006300' }
                        , { id: '11.018', label: '   Al Sahra AAF (ORSH) ', comment: '', buildingsearch: 'false', xmin: '4836942', ymin: '4114511', xmax: '4858215', ymax: '4127025' }
                        , { id: '11.019', label: '   Al Taji AAF (ORTI)', comment: '', buildingsearch: 'false', xmin: '4919728', ymin: '3960815', xmax: '4936202', ymax: '3971405' }
                        , { id: '11.02', label: '   Al Taqaddum AB (ORAT)', comment: '', buildingsearch: 'false', xmin: '4835000', ymin: '3937900', xmax: '4864000', ymax: '3951800' }
                        , { id: '11.021', label: '   Ali AB (ORTL) ', comment: '', buildingsearch: 'false', xmin: '5103100', ymin: '3606700', xmax: '5158700', ymax: '3640300' }
                        , { id: '11.022', label: '   Baghdad INTL (ORBI)', comment: '', buildingsearch: 'false', xmin: '4916524.7776', ymin: '3925991.5685', xmax: '4928554.0549', ymax: '3933931.4648' }
                        , { id: '11.023', label: '   Balad SE (ORBI)', comment: '', buildingsearch: 'false', xmin: '4923400', ymin: '4013800', xmax: '4952400', ymax: '4027700' }
                        , { id: '11.024', label: '   Erbil (ORER)', comment: '', buildingsearch: 'false', xmin: '4885380', ymin: '4329369', xmax: '4899184', ymax: '4338242' }
                        , { id: '11.025', label: '   Kirkuk AB (ORKK)', comment: '', buildingsearch: 'false', xmin: '4921800', ymin: '4221000', xmax: '4950800', ymax: '4234900' }
                        , { id: '11.026', label: '   Mosul (ORBM)', comment: '', buildingsearch: 'false', xmin: '4797662', ymin: '4339850', xmax: '4806324', ymax: '4345419' }
                        , { id: '11.027', label: '   Rasheed', comment: '', buildingsearch: 'false', xmin: '4944000', ymin: '3927630', xmax: '4961400', ymax: '3935850' }
                        , { id: '11.028', label: '<b><i>-Jordan</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/centcom/jordan/', comment: '', buildingsearch: 'false', xmin: '3719919.7171', ymin: '3478014.3633', xmax: '4598028.298', ymax: '3893831.7971' }
                        , { id: '11.029', label: '   Amman-Marka INTL (OJAM)', comment: '', buildingsearch: 'false', xmin: '4003207.2872', ymin: '3757699.8384', xmax: '4009221.9258', ymax: '3761669.7866' }
                        , { id: '11.030', label: '   King Faisal (OJ39)', comment: '', buildingsearch: 'false', xmin: '4011460.0976', ymin: '3538829.5739', xmax: '4035518.6522', ymax: '3554709.3665' }
                        , { id: '11.031', label: '   Muwaffaq Salti AB (OJMS)', comment: '', buildingsearch: 'false', xmin: '4088140.7689', ymin: '3736376.2962', xmax: '4100170.0462', ymax: '3744316.1925' }
                        , { id: '11.032', label: '   Queen Alia INTL (OJAI)', comment: '', buildingsearch: 'false', xmin: '4001652.2714', ymin: '3722617.6311', xmax: '4013681.5487', ymax: '3730557.5274' }
                        , { id: '11.033', label: '<b><i>-Lebanon</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/centcom/lebanon/', comment: '', buildingsearch: 'false', xmin: '3746693.5521', ymin: '3914642.6696', xmax: '4185747.8425', ymax: '4122551.3865' }
                        , { id: '11.034', label: '   Beirut INTL (OLBA)', comment: '', buildingsearch: 'false', xmin: '3943084.1643', ymin: '4000868.4148', xmax: '3955113.4416', ymax: '4008808.3111' }
                        , { id: '11.035', label: '<b><i>-Kazakhstan</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/centcom/kazakhstan/', comment: '', buildingsearch: 'false', xmin: '3793880.9609', ymin: '4598040.3529', xmax: '10818749.6084', ymax: '7924579.8239' }
                        , { id: '11.036', label: '   Almaty INTL (UAAA)', comment: '', buildingsearch: 'false', xmin: '8569076.6501', ymin: '5362396.2194', xmax: '8581268.3561', ymax: '5369973.0399' }
                        , { id: '11.037', label: '<b><i>-Kyrgystan</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/centcom/kyrgyzstan/', comment: '', buildingsearch: 'false', xmin: '7370159.7807', ymin: '4639691.7881', xmax: '9126376.9426', ymax: '5471326.6558' }
                        , { id: '11.038', label: '   Manas INTL (UAFM)', comment: '', buildingsearch: 'false', xmin: '8287483.5562', ymin: '5319056.5172', xmax: '8293579.4092', ymax: '5322844.9274' }
                        , { id: '11.039', label: '<b><i>-Kuwait</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/centcom/kuwait/', comment: '', buildingsearch: 'false', xmin: '5091861.3937', ymin: '3302573.0773', xmax: '5530915.6841', ymax: '3510481.7942' }
                        , { id: '11.04', label: '   Ali Al Salem AB(OKAS)', comment: '', instlid: 'OKAS', buildingsearch: 'true', dataurl: 'https://www.my.af.mil/accgeolib/centcom/kuwait/ali_al_salem_ab/', xmin: '5282600', ymin: '3416600', xmax: '5297100', ymax: '3423600' }
                        , { id: '11.041', label: '   Al Jaber Air Base (OKAJ)', comment: '', buildingsearch: 'false', xmin: '5313284.9229', ymin: '3364063.2327', xmax: '5325314.2002', ymax: '3372003.129' }
                        , { id: '11.042', label: '   Kuwait City INTL (OKBK)', comment: '', instlid: 'OKBK', buildingsearch: 'true', xmin: '5333502.7266', ymin: '3400722.9989', xmax: '5345532.004', ymax: '3408662.8952' }
                        , { id: '11.043', label: '<b><i>-Oman</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/centcom/oman/', comment: '', buildingsearch: 'false', xmin: '5408934.2915', ymin: '1921592.1286', xmax: '7165151.4534', ymax: '2753226.9964' }
                        , { id: '11.044', label: '   Masirah Island AirBase (OOMA)', comment: '', buildingsearch: 'false', xmin: '6548863.5809', ymin: '2348727.02', xmax: '6560892.8582', ymax: '2356666.9163' }
                        , { id: '11.045', label: '   Muscat INTL (OOMS)', comment: '', buildingsearch: 'false', xmin: '6482863.1194', ymin: '2700430.4855', xmax: '6494892.3967', ymax: '2708370.3818' }
                        , { id: '11.046', label: '   Mussanah AB (OOMN)', comment: '', buildingsearch: 'false', xmin: '6390708', ymin: '2706048', xmax: '6405114', ymax: '2713268' }
                        , { id: '11.047', label: '   Thumrait (OOTH)', comment: '', buildingsearch: 'false', xmin: '6008500', ymin: '1994495', xmax: '6021155', ymax: '2002630' }
                        , { id: '11.048', label: '<b><i>-Qatar</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/centcom/qatar/', comment: '', buildingsearch: 'false', xmin: '5486839.9907', ymin: '2811071.2106', xmax: '5925894.2812', ymax: '3018979.9275' }
                        , { id: '11.049', label: '   Al Udeid AirBase (OTBH)', comment: '', instlid: 'ALUA', buildingsearch: 'true', dataurl: 'https://www.my.af.mil/accgeolib/centcom/qatar/al_udeid/', xmin: '5700452.8209', ymin: '2882014.3274', xmax: '5724511.3755', ymax: '2897894.1201' }
                        , { id: '11.050', label: '   Doha INTL (OTBD)', comment: '', buildingsearch: 'false', xmin: '5733937.8614', ymin: '2903936.3746', xmax: '5745967.1387', ymax: '2911876.271' }
                        , { id: '11.051', label: '<b><i>-Saudi Arabia</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/centcom/saudi_arabia/', comment: '', buildingsearch: 'false', xmin: '3666531.372782382', ymin: '1947585.888879491', xmax: '6220139.613732871', ymax: '4114728.5148202325' }
                        , { id: '11.052', label: '   Eskan Village', comment: '', buildingsearch: 'false', xmin: '5213995', ymin: '2822847', xmax: '5218930', ymax: '2826020' }
                        , { id: '11.053', label: '   Prince Sultan AB (OEPS)', comment: '', buildingsearch: 'false', xmin: '5287353', ymin: '2755952', xmax: '5303966', ymax: '2766631' }
                        , { id: '11.054', label: '<b><i>-Syria</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/centcom/syria/', comment: '', buildingsearch: 'false', xmin: '3909906.870842318', ymin: '3812649.379037297', xmax: '4840604.127242377', ymax: '4633277.314706731' }
                        , { id: '11.055', label: '   Aleppo INTL (OSAP)', comment: '', buildingsearch: 'false', xmin: '4141558', ymin: '4324245', xmax: '4146461', ymax: '4327143' }
                        , { id: '11.056', label: '   Bassel Al Assad INTL (OSLK)', comment: '', buildingsearch: 'false', xmin: '3997389', ymin: '4215945', xmax: '4006480', ymax: '4221318' }
                        , { id: '11.057', label: '   Damascus INTL (OSDI)', comment: '', buildingsearch: 'false', xmin: '4056648', ymin: '3945172', xmax: '4072413', ymax: '3954491' }
                        , { id: '11.058', label: '<b><i>-Tajikistan</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/centcom/tajikistan/', comment: '', buildingsearch: 'false', xmin: '7018417.9459', ymin: '4245728.6306', xmax: '8774635.1078', ymax: '5077363.4983' }
                        , { id: '11.059', label: '   Dushanbe INTL (UTDD)', comment: '', buildingsearch: 'false', xmin: '7648284.4861', ymin: '4649941.0017', xmax: '7675725.3792', ymax: '4662935.2965' }
                        , { id: '11.06', label: '<b><i>-UAE</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/centcom/united_arab_emirates/', comment: '', buildingsearch: 'false', xmin: '5721770.1893', ymin: '2575898.2614', xmax: '6287404.1986', ymax: '3032685.9424' }
                        , { id: '11.061', label: '   Abu Dhabi NE (OM11)', comment: '', buildingsearch: 'false', xmin: '6114032', ymin: '2813605', xmax: '6125281', ymax: '2820836' }
                        , { id: '11.062', label: '   Al Dhafra (OMAM)', comment: '', instlid: 'OMAM', buildingsearch: 'true', dataurl: 'https://www.my.af.mil/accgeolib/centcom/united_arab_emirates/al_dhafra/', xmin: '6063811', ymin: '2775767', xmax: '6079184', ymax: '2788243' }
                        , { id: '11.063', label: '   Liwa (OMSM)', comment: '', buildingsearch: 'false', xmin: '5984663', ymin: '2707872', xmax: '5996680', ymax: '2715597' }
                        , { id: '11.064', label: '   Minhad AB (OMDM)', comment: '', buildingsearch: 'false', xmin: '6159945', ymin: '2875074', xmax: '6170334', ymax: '2881752' }
                        , { id: '11.065', label: '<b><i>-Yemen</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/centcom/yemen/', comment: '', buildingsearch: 'false', xmin: '4149050.4982', ymin: '1300082.7094', xmax: '5905267.6601', ymax: '2131717.5772' }
                        , { id: '11.066', label: '   Al Anad Airfield (OY??)', comment: '', buildingsearch: 'false', xmin: '4979673.2767', ymin: '1478718.8962', xmax: '4985687.9153', ymax: '1482607.63' }
                        , { id: '11.067', label: '   Al Hodeidah INTL (OYHD)', comment: '', buildingsearch: 'false', xmin: '4776545.9499', ymin: '1658118.5272', xmax: '4788575.2273', ymax: '1666058.4236' }
                        , { id: '11.068', label: '   Socotra INTL (OYSQ)', comment: '', buildingsearch: 'false', xmin: '5997558', ymin: '1415173', xmax: '6005173', ymax: '1419674' }
                        , { id: '11.069', label: '   Sanaa INTL (OYSN)', comment: '', buildingsearch: 'false', xmin: '4916538.8972', ymin: '1740255.5665', xmax: '4928568.1745', ymax: '1748195.4628' }


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
            label: '<b>SOUTHCOM</b>',
            id: '14',
            xmin: '-20522265.9444',
            ymin: '-8877556.5501',
            xmax: '7577208.6456',
            ymax: '4428601.3337',
            children: [
                          { id: '14.002', label: '<b><i>-Aruba</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/aruba/', comment: '', buildingsearch: 'false', xmin: '-7812317', ymin: '1388437', xmax: '-7768404', ymax: '1418439' }
                        , { id: '14.003', label: '   Reina Beatrix INTL (TNCA)', comment: '', buildingsearch: 'false', xmin: '-7797481', ymin: '1400032', xmax: '-7790072', ymax: '1404795' }
                        , { id: '14.004', label: '<b><i>-Ascension Island</b></i>', comment: '', buildingsearch: 'false', xmin: '-1612267.1612', ymin: '-893601.6075', xmax: '-1584826.268', ymax: '-880607.3127' }
                        , { id: '14.005', label: '   Ascension Island (FHAW)', comment: '', buildingsearch: 'false', xmin: '-1604020.7527', ymin: '-890268.2856', xmax: '-1602305.6969', ymax: '-889456.1422' }
                        , { id: '14.006', label: '<b><i>-Barbados</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/barbados/', comment: '', buildingsearch: 'false', xmin: '-6649104', ymin: '1460529', xmax: '-6608133', ymax: '1503333' }
                        , { id: '14.007', label: '   Grantley Adams (TBPB)', comment: '', buildingsearch: 'false', xmin: '-6625092', ymin: '1466385', xmax: '-6619622', ymax: '1468243' }
                        , { id: '14.008', label: '<b><i>-Bolivia</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/bolivia/', comment: '', buildingsearch: 'false', xmin: '-8845639.2417', ymin: '-2731922.4328', xmax: '-5333204.918', ymax: '-1068652.6973' }
                        , { id: '14.009', label: '   El Alto INTL (SLLP)', comment: '', buildingsearch: 'false', xmin: '-7593896.9119', ymin: '-1865542.1584', xmax: '-7587801.0589', ymax: '-1861653.4246' }
                        , { id: '14.01', label: '   Viru Viru INTL (SLVR)', comment: '', buildingsearch: 'false', xmin: '-7034124.3944', ymin: '-2000134.7654', xmax: '-7021932.6884', ymax: '-1992357.2978' }
                        , { id: '14.011', label: '<b><i>-Chile</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/chile/', comment: '', buildingsearch: 'false', xmin: '-9354433', ymin: '-5744302', xmax: '-6543996', ymax: '-3709242' }
                        , { id: '14.012', label: '   Chacalluta INTL (SCAR)', comment: '', buildingsearch: 'false', xmin: '-7832796', ymin: '-2080545', xmax: '-7826639', ymax: '-2076906' }
                        , { id: '14.013', label: '   Quintero Airfield, Chile (SCER)', comment: '', buildingsearch: 'false', xmin: '-7967641.3353', ymin: '-3872225.6754', xmax: '-7955449.6293', ymax: '-3864266.6699' }
                        , { id: '14.014', label: '<b><i>-Colombia</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/colombia/', comment: '', buildingsearch: 'false', xmin: '-9895079.0177', ymin: '-410517.8313', xmax: '-6382644.694', ymax: '1252751.9042' }
                        , { id: '14.015', label: '   Alfonso Bonilla Aragon INTL (SKCL)', comment: '', buildingsearch: 'false', xmin: '-8256871.0729', ymin: '521904.0355', xmax: '-8250775.2199', ymax: '525792.7694' }
                        , { id: '14.016', label: '   El Dorado INTL (SKBO)', comment: '', buildingsearch: 'false', xmin: '-8505688', ymin: '391026', xmax: '-8499195', ymax: '397994' }
                        , { id: '14.017', label: '   Simon Bolivar (SKSM)', comment: '', buildingsearch: 'false', xmin: '-8264652', ymin: '1243769', xmax: '-8260984', ymax: '1247398' }
                        , { id: '14.018', label: '<b><i>-Cuba</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/cuba/', comment: '', buildingsearch: 'false', xmin: '-9507849', ymin: '2216338', xmax: '-8242051', ymax: '2690859' }
                        , { id: '14.019', label: '   Guantanamo Bay (MUGM)', comment: '', buildingsearch: 'false', xmin: '-8365568', ymin: '2262173', xmax: '-8355710', ymax: '2272760' }
                        , { id: '14.02', label: '<b><i>-Ecuador</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/ecuador/', comment: '', buildingsearch: 'false', xmin: '-9614168.375', ymin: '-649383.1008', xmax: '-7857951.2131', ymax: '182251.767' }
                        , { id: '14.021', label: '   Mariscal Sucre INTL (SEQU)', comment: '', buildingsearch: 'false', xmin: '-8740337.9292', ymin: '-17505.6525', xmax: '-8734242.0761', ymax: '-13616.9187' }
                        , { id: '14.022', label: '<b><i>-Haiti</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/haiti/', comment: '', buildingsearch: 'false', xmin: '-8364417.9097', ymin: '2049547.2023', xmax: '-7925363.6193', ymax: '2257455.9193' }
                        , { id: '14.023', label: '   Cape Haitien INTL Airport (MTCH)', comment: '', buildingsearch: 'false', xmin: '-8040197.787', ymin: '2239046.4785', xmax: '-8034101.934', ymax: '2242834.8888' }
                        , { id: '14.024', label: '   Touissant L Overture INTL (MTPP)', comment: '', buildingsearch: 'false', xmin: '-8051211.6698', ymin: '2102816.5628', xmax: '-8045197.0311', ymax: '2106786.5109' }
                        , { id: '14.025', label: '<b><i>-Honduras</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/honduras/', comment: '', buildingsearch: 'false', xmin: '-10034672.1914', ymin: '1390789.6423', xmax: '-9156563.6104', ymax: '1806607.0762' }
                        , { id: '14.026', label: '   Goloson INTL (MHLC)', comment: '', buildingsearch: 'false', xmin: '-9672045.3746', ymin: '1772864.9055', xmax: '-9665949.5215', ymax: '1776753.6393' }
                        , { id: '14.027', label: '   La Mesa INTL (MHLM)', comment: '', buildingsearch: 'false', xmin: '-9791641.9446', ymin: '1739559.1037', xmax: '-9785546.0916', ymax: '1743447.8375' }
                        , { id: '14.028', label: '   Mocoron (MHDU)', comment: '', buildingsearch: 'false', xmin: '-9378338', ymin: '1685885', xmax: '-9372115', ymax: '1689885' }
                        , { id: '14.029', label: '   Soto Cano AirBase (MHSC)', comment: '', buildingsearch: 'false', xmin: '-9756971.9183', ymin: '1616326.9009', xmax: '-9750876.0653', ymax: '1620215.6347' }
                        , { id: '14.03', label: '   Toncontin INTL (MHTG)', comment: '', buildingsearch: 'false', xmin: '-9712729.6314', ymin: '1579022.1381', xmax: '-9706633.7784', ymax: '1582910.8719' }
                        , { id: '14.031', label: '   Trujillo (MHTJ)', comment: '', buildingsearch: 'false', xmin: '-9568769', ymin: '1794841', xmax: '-9565707', ymax: '1796809' }
                        , { id: '14.032', label: '<b><i>-Netherlands Antilles</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/netherlands_antilles/', comment: '', buildingsearch: 'false', xmin: '-7708521', ymin: '1333949', xmax: '-7570017', ymax: '1403965' }
                        , { id: '14.033', label: '   Curacao INTL (TNCC)', comment: '', buildingsearch: 'false', xmin: '-7679137', ymin: '1364448', xmax: '-7672730', ymax: '1369163' }
                        , { id: '14.034', label: '<b><i>-Nevis</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/st_kitts_and_nevis/', comment: '', buildingsearch: 'false', xmin: '-7091492.6316', ymin: '1901414.5586', xmax: '-6871965.4863', ymax: '2005368.9171' }
                        , { id: '14.035', label: '   Vance Amory INTL (TKPN)', comment: '', buildingsearch: 'false', xmin: '-6968263.6015', ymin: '1944181.6731', xmax: '-6966759.9419', ymax: '1945174.1601' }
                        , { id: '14.036', label: '<b><i>-Nicaragua</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/nicaragua/', comment: '', buildingsearch: 'false', xmin: '-9787914', ymin: '1192693', xmax: '-9153181', ymax: '1713688' }
                        , { id: '14.037', label: '   Augusto Cesar Sandino INTL (MNMG)', comment: '', buildingsearch: 'false', xmin: '-9595106', ymin: '1359230', xmax: '-9589650', ymax: '1363205' }
                        , { id: '14.038', label: '<b><i>-Panama</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/panama/', comment: '', buildingsearch: 'false', xmin: '-9385052.5319', ymin: '749205.5881', xmax: '-8506943.9509', ymax: '1165023.022' }
                        , { id: '14.039', label: '   Enrique Adolfo Jimenez (MPEJ)', comment: '', buildingsearch: 'false', xmin: '-8894636', ymin: '1044510', xmax: '-8887233', ymax: '1049269' }
                        , { id: '14.04', label: '   Enrique Malek INTL (MPDA)', comment: '', buildingsearch: 'false', xmin: '-9178557', ymin: '936349', xmax: '-9174591', ymax: '938898' }
                        , { id: '14.041', label: '   Panama Pacifico INTL (MPHO)', comment: '', buildingsearch: 'false', xmin: '-8864334', ymin: '994581', xmax: '-8857500', ymax: '998973' }
                        , { id: '14.042', label: '   Tocumen INTL (MPTO)', comment: '', buildingsearch: 'false', xmin: '-8844328.3675', ymin: '1010340.1387', xmax: '-8832136.6614', ymax: '1018117.6064' }
                        , { id: '14.043', label: '<b><i>-Peru</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/peru/', comment: '', buildingsearch: 'false', xmin: '-10131964.6164', ymin: '-1948521.0703', xmax: '-6619530.2927', ymax: '-285251.3348' }
                        , { id: '14.044', label: '   Jorge Chavez INTL (SPIM)', comment: '', buildingsearch: 'false', xmin: '-8587317.0991', ymin: '-1350081.7063', xmax: '-8581221.2461', ymax: '-1346192.9725' }
                        , { id: '14.045', label: '   Pichari Helipad', comment: '', buildingsearch: 'false', xmin: '-8222581.464', ymin: '-1407227.239', xmax: '-8215721.2408', ymax: '-1403978.6653' }
                        , { id: '14.046', label: '<b><i>-Puerto Rico</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/puerto_rico/', comment: '', buildingsearch: 'false', xmin: '-7492598.6516', ymin: '2006713.1419', xmax: '-7273071.5064', ymax: '2110667.5004' }
                        , { id: '14.047', label: '   Luis Munoz Marin INTL (TJSJ)', comment: '', buildingsearch: 'false', xmin: '-7350867.9993', ymin: '2087320.4449', xmax: '-7344853.3606', ymax: '2091290.393' }
                        , { id: '14.048', label: '<b><i>-St. Kitts</b></i>', dataurl: 'https://www.my.af.mil/accgeolib/southcom/st_kitts_and_nevis/', comment: '', buildingsearch: 'false', xmin: '-7011748.5783', ymin: '1944805.3215', xmax: '-6956866.792', ymax: '1970793.9111' }
                        , { id: '14.049', label: '   Robert Bradshaw INTL (TKPK)', comment: '', buildingsearch: 'false', xmin: '-6983211.7162', ymin: '1956057.6686', xmax: '-6980204.3968', ymax: '1958042.6427' }



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
