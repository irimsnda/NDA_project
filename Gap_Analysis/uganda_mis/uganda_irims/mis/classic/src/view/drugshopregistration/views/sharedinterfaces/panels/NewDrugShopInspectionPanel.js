/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.NewDrugShopInspectionPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'newdrugshopinspectionpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    
    items: [{
            title: 'Drug Shop Inspection Schedules',
            region: 'north',
            height: 250,
            autoScroll: true,
            collapsible: true,
            collapsed: true,
            xtype: 'premisesinspectiondetailsfrm'
        },
        {

           
           //title: 'Preview & Premises Inspection Upload',
            region: 'center',
            layout: 'fit',
            xtype:'tabpanel',
            listeners: {
                tabchange: 'funcActiveInspectionTabChanges'
            },
            items: [{
                     title: 'Premises Application Details & Documents Uploads',
                    xtype:'drugshopappmoredetailswizard'
                },{
                    xtype: 'premiseinspectionrecommfrm',
                    itemId: 'premiseinspectionrecommfrm',
                    title:'Premises Inspection Details'
               },{
                   xtype: 'inspectionscaparequestsgrid',
                   title: 'CAPA Request(Corrective and Preventive Actions (CAPA) )'
               }]
        },
        {
            title: 'Other Details',
            region: 'south',
            width: 200,
            collapsed: true,
            collapsible: true,
            titleCollapse: true,
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 5,
                    layout: 'column',
                    defaults: {
                        margin: 2,
                        labelAlign: 'top',
                        columnWidth: 0.5
                    },
                    fieldDefaults: {
                        fieldStyle: {
                            'color': 'green',
                            'font-weight': 'bold'
                        }
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Applicant Details',
                            name: 'applicant_details'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Product Details',
                            name: 'product_details',
                            hidden: true
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Premise Details',
                            name: 'premise_details',
                            hidden: true
                        },
                        {
                            xtype: 'toolbar',
                            ui: 'footer',
                            columnWidth: 1,
                            items: [
                                {
                                    text: 'More Details',
                                    iconCls: 'fa fa-bars',
                                    name: 'more_app_details',
                                    isReadOnly: 0,
                                    is_temporal: 0
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: 'Inspectors',
            xtype: 'inspectioninspectorsgrid',
            region: 'west',
            width: 400,collapsed: true,
            collapsible: true,
            titleCollapse: true
        },
        {
            xtype: 'toolbar',
            ui: 'footer',
            region: 'south',
            height: 45,
            split: false,
            items: [
                {
                    xtype: 'transitionsbtn'
                },
                // {
                //     text: 'General Inspection Comments',
                //     ui: 'soft-purple',
                //     iconCls: 'fa fa-weixin',
                //     childXtype: 'applicationcommentspnl',
                //     winTitle: 'Inspection Comments',
                //     winWidth: '60%',
                //     comment_type_id: 1,
                //     name: 'comments_btn',
                //     stores: '[]'
                // },
                {
                    text: 'Inspection Documents & Recommendation',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-upload',
                    hidden: true,
                    childXtype: 'preminspectionuploaddetailspnl',
                    winTitle: 'Inspection Recommendation & Documents',
                    winWidth: '80%',
                    name: 'premisesinspectiondocs_btn',
                    stores: '[]',
                    isWin: 1
                },
                {
                    text: 'Inspections',
                    ui: 'soft-purple',
                    hidden: true,
                    iconCls: 'fa fa-bars',
                    menu:{
                        xtype: 'menu',
                        items:[
                            {
                                text: 'Inspection Details(Current)',
                                ui: 'soft-purple',
                                iconCls: 'x-fa fa-bars',
                                childXtype: 'inspectiondetailstabpnl',
                                winTitle: 'Inspection Details',
                                winWidth: '60%',
                                name: 'inspection_details',
                                isReadOnly: 1,
                                stores: '[]'
                            },
                            {
                                text: 'Prev Inspections',
                                ui: 'soft-purple',
                                iconCls: 'x-fa fa-history',
                                childXtype: 'checklistresponseshistorygrid',
                                winTitle: 'Previous Inspections',
                                winWidth: '85%',
                                name: 'prev_inspections'
                            },
                        ]
                    }
                },
                {
                    text: 'Recommendation',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    childXtype: 'premiseinspectionrecommfrm',
                    winTitle: 'Inspection Recommendation',
                    winWidth: '55%',
                    hidden: true,
                    name: 'recommendation'
                },
                '->',{
                    xtype: 'button',
                    text: "Raise/View Query(Request for Information)",
                    tooltip: 'Raise Query/View Query(Request for Information) and query Responses',
                    ui: 'soft-green',
                    name: 'raise_checklist_query',
                     hidden: true,
                    handler:'showGeneralAppAppQueries'
                },
                {
                    text: 'Save Inspection Details',
                    ui: 'soft-purple',
                    hidden: true,
                    iconCls: 'fa fa-save',
                    name: 'save_btn'
                },
                // {
                //     xtype: 'button',
                //     text: 'Upload Concept Note',
                //     iconCls: 'x-fa fa-upload',
                //     ui: 'soft-purple',
                //     reference_table_name: 'tra_premise_inspection_details',
                //     table_name: 'tc_incepttionconcept_uploaddocuments',
                //     handler: 'funcUploadTCMeetingtechnicalDocuments',
                //     document_type_id: 23,
                //     childXtype:'unstructureddocumentuploadsgrid',
                //     winTitle: 'Concept Note Upload',
                //     winWidth: '80%',
                //     toaster: 0
                // },
                // {
                //     text: 'Preview/Add CAPA Request',
                //     iconCls: 'x-fa fa-cubes',ui: 'soft-red',
                //     handler: 'showPremisesInspectionCAPApplicationQueries'
                // },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'foodpremiseregistrationstr',
                    table_name: 'tra_premises_applications',
                    winWidth: '50%'
                }
            ]
        }
    ],
});
