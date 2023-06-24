/**
 * Created by Softclans on 10/16/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.commoninterfaces.ControlDrugsImpEvaluationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'controldrugsimpevaluationpnl',
    itemId: 'main_processpanel',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    controller: 'importexportpermitsvctr',
    viewModel: 'importexportpermitsvm',
    
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        ui: 'footer',
        height: 40,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:13px"
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            }, {
                xtype: 'displayfield',
                name: 'workflow_stage',
                fieldLabel: 'Workflow Stage',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            }, {
                xtype: 'displayfield',
                name: 'application_status',
                hidden: true,
                fieldLabel: 'App Status',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            },{
                xtype: 'displayfield',
                name: 'tracking_no',
               
                fieldLabel: 'Tracking No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
                }
            },  {
                xtype: 'displayfield',
                name: 'reference_no',
               
                fieldLabel: 'Ref No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
                }
            }, {
                xtype: 'hiddenfield',
                name: 'process_id'
            }, {
                xtype: 'hiddenfield',
                name: 'workflow_stage_id'
            }, {
                xtype: 'hiddenfield',
                name: 'active_application_id'
            },{
                xtype: 'hiddenfield',
                name: 'active_application_code'
            }, {
                xtype: 'hiddenfield',
                name: 'application_status_id'
            },{
                xtype: 'hiddenfield',
                name: 'module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'sub_module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'section_id'
            }
            ]
        }
    ],
    items: [{
        xtype:'tabpanel',
        layout: 'fit',
        title: 'Application Details((Permit, Sender/Receiver, Licenses Outlets and Documents)',
        items:[{
            xtype: 'panel',
            autoScroll: true, 
            itemId:'permitsdetails_panel', 
            viewModel: 'importexportpermitsvm',
            title: 'Application Details',
            items:[{
                xtype: 'importexportapplicantdetailsfrm',
                collapsible: true,
                title: 'APPLICANT DETAILS'
            },{
                xtype: 'importexportdetailsfrm',
                autoScroll: true,
                collapsible: true,
                title: 'Application Details', 
                title: 'Permit Information'
            },  {
                xtype: 'senderreceiverdetailsfrm',collapsible: true,
                title: 'Sender/Receiver Details',
            },{
                xtype: 'importexportpremisesfrm',collapsible: true,
                title: 'Licensed Outlet Details',
            }],
            bbar:[{
                text: 'Update Permit Application Details',
                ui: 'soft-purple',
                iconCls: 'fa fa-save',
                name: 'save_btn',
                action_url: 'importexportpermits/onSavePermitinformation',
                handler: 'savePermitInformation'
            }]

        },{
            xtype: 'panel',
            title: 'Uploaded Application Documents',
            xtype: 'previewpermitdocuploadsgrid'
        }]
    },
    {
        xtype: 'controldrugsimppermitsproductsgrid',//
        itemId: 'importexportpermitsproductsgrid',
        title: 'Recommendation on Import/Export Permit Products Details',
        bind: {
            title: '{application_title}'+' Permit Products Details Recommendations'
        },
        selModel: {
            selType: 'checkboxmodel',
            mode: 'MULTI'
        },
        plugins: [{
            ptype: 'gridexporter'
        }, {
            ptype: 'cellediting',
            clicksToEdit: 1,
            editing: true
        },{
            ptype: 'filterfield'
        }],
        
        tbar:[{
            text:'Recommend Selected Permits Products',
           // name:'btn_recommendallproducts',
           viewXtype: 'permitsproductsrecommendationfrm',
           winTitle: 'Permits Porducts Recommendation',
           winWidth: '40%',
            handler: 'funcPermitsProductRecommendationWin',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-red',
        },'->',{
            text:'Update Permits Products Recommendation',
            name:'btn_updatesprodrecommendtion',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-green',

        }],
        columns: [{
            xtype:'rownumberer'  
          },{
            xtype: 'gridcolumn',
            dataIndex: 'permitbrand_name', tdCls:'wrap-text',
            text: 'Drug Name',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'controlleddrugs_type',
            text: 'Drug Type',
            flex: 1,
        },{
            xtype: 'gridcolumn',
            dataIndex: 'controlled_drugssubstances',
            tdCls:'wrap-text',
            text: 'Drugs Substance',
            flex: 1,
        },{
            xtype: 'gridcolumn',
            dataIndex: 'controlleddrugs_basesalt',
            
            text: 'Drugs Base Salt',
            flex: 1,
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'dosage_form',
            text: 'Dosage Form',
            flex: 1,
        },{
            xtype: 'gridcolumn',
            dataIndex: 'product_strength',
            text: 'Product Strength',
            flex: 1,
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'strength_asgrams',
            text: 'Strength As Grams',
            flex: 1,
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'pack_unitdetails', 
            text: 'Pack Unit Details',
    
            flex: 1,
        },{
            xtype: 'gridcolumn',
            dataIndex: 'quantity',
            text: 'Quantity',
    
            flex: 1,
        },{
            
            xtype: 'gridcolumn',
            dataIndex: 'controlleddrug_base',
            text: 'Base (g)',
            flex: 1,
        },{
            xtype: 'gridcolumn',
            dataIndex: 'currency_name',
            text: 'Currency Name',
            flex: 1,
        },{
            xtype: 'gridcolumn',
            dataIndex: 'unit_price',
            text: 'Unit Price',
            flex: 1,
        },{
            xtype: 'gridcolumn',
            dataIndex: 'total_value',
            text: 'Total Value',
            width: 200,
            summaryType: 'sum',
            renderer: function (val, meta, record) {
                return Ext.util.Format.number(val, '0,000.00');
            },
            summaryRenderer: function (val) {
                val = Ext.util.Format.number(val, '0,000.00');
                return 'Total Fob '+val
            }
        },{   
            xtype: 'gridcolumn',
            dataIndex: 'permitprod_recommendation_id',
            tdCls:'wrap-text',
            text: 'Permits Product Recommendation(Acceptance)',
            flex: 1,
                editor: {
                    xtype: 'combo',
                    store: 'permitprod_recommendationstr',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    listeners: {
                       
                    }
                },
                renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                    var textVal = 'Select Recommendation';
                    
                    if (val == 2) {
                        meta.tdStyle = 'color:white;background-color:green';
                        textVal = 'Accepted';
                        
                    }else if(val == 3){
                        meta.tdStyle = 'color:white;background-color:red';
                        textVal = 'Rejected';
                       
                    }else if(val == 3){
                        meta.tdStyle = 'color:white;background-color:yellow';
                        textVal = 'Queried';
                       
                    }else{
                        meta.tdStyle = 'color:white;background-color:blue';
                        textVal = 'Initial Request';
                    }
                    
                    return textVal;
                }
          },{   
            xtype: 'gridcolumn',
            dataIndex: 'permitprod_recommendation_remarks',
            tdCls:'wrap-text',
            text: 'Recommendation Remarks',
            flex: 1,
            editor: {
                xtype:'textfield'
            },renderer: function (val) {
                if (val == '') {
                   
                         var val = 'Recommendation Remarks';
                }
                return val;
            }
          },{
            xtype: 'widgetcolumn',
            width: 120,
            hidden: true,
            widget: {
                width: 120,
                textAlign: 'left',
                xtype: 'button',
                ui: 'soft-green',
                text: 'Download Report',
                iconCls: 'x-fa fa-eye',
                handler: 'previewUploadedDocument',
                download: 0
            }
        }]
    },{
        xtype: 'productscreeninggrid',
        title: 'Application Screening & Recommendation',
        listeners:{
            beforerender:function(grid){
                btn = grid.down('button[name=raise_checklist_query]');
                btn.setVisible(false);
            }
        }
    },{
        title: 'Other Details',
        region: 'east',
        width: 400,
        collapsed: true,
        collapsible: true,
        titleCollapse: true,
        items: [
            {
                xtype: 'form',
                bodyPadding: 5,
                defaults: {
                    margin: 2,
                    labelAlign: 'top'
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
                        fieldLabel: 'Premises Details',
                        name: 'premises_details'
                    }
                ]
            }
        ]
    },
    {
        xtype: 'hiddenfield',
        name: 'active_application_id'
    }
],
initComponent: function () {
    var me = this;
    this.tbar = {
        reference: 'progress',
        itemId: 'progress_tbar',
        defaultButtonUI: 'wizard-' + this.colorScheme,
        cls: 'wizardprogressbar',
        style: {
            "background-color": "#90c258"
        },
        bodyStyle: {
            "background-color": "#90c258"
        },
        layout: {
            pack: 'center'
        },
        items: [
            {
                step: 0,
                iconCls: 'fa fa-user',
                enableToggle: true,
                pressed: true,
                text: 'Application Details (Permit, Sender/Receiver, Licenses Outlets and Documents)',
                iconAlign: 'top',
                action: 'quickNav',max_step:2,
                wizard: 'controldrugsimpevaluationpnl',
                handler: 'quickScreeningNavigation'
            },
            {
                step: 1,
                iconCls: 'fa fa-university',
                enableToggle: true,iconAlign: 'top',
                text: 'Recommendation on Import/Export Permit Products Details',
                max_step:2,
                action: 'quickNav', wizard: 'controldrugsimpevaluationpnl',
                handler: 'quickScreeningNavigation'
            }, {
                step: 2,
                iconCls: 'fa fa-university',
                enableToggle: true,iconAlign: 'top',
                text: 'Application Screening & Recommendation',
                max_step:2,
                action: 'quickNav', wizard: 'controldrugsimpevaluationpnl',
                handler: 'quickScreeningNavigation'
            }
        ]
    };
    this.bbar = {
        reference: 'navigation-toolbar',
        ui: 'footer',
        items: [
            {
                xtype: 'transitionsbtn'
            },{
                text: 'Preview & Edit Permit Details(Preview Option)',
                ui: 'soft-purple',
                iconCls: 'fa fa-edit',
                hidden: true,
                isReadOnly: 0,
                winTitle: 'Preview & Edit Permit Details',
                winWidth: '60%',
                name: 'more_app_details',
                stores: '[]'
            },
            {
                text: 'Documents/Reports(Preview Option)',
                ui: 'soft-purple',
                iconCls: 'fa fa-upload',
                hidden: true,
                childXtype: 'importexportdocuploadsgrid',
                winTitle: 'Screening Documents',
                winWidth: '80%',
                handler: 'showApplicationEvaluationUploads',
                stores: '[]',
                isWin: 1
            },
            '->',
            {
                text: 'Previous',
                ui: 'soft-purple',
                iconCls: 'fa fa-arrow-left',
                bind: {
                    disabled: '{atBeginning}'
                },max_step:2,
                wizard:'controldrugsimpevaluationpnl',
                handler: 'onPrevScreeningCardClick'
            },{
                xtype: 'button',
                text: "Raise/View Query & Responses(Request for Information)",
                tooltip: 'Raise Query/View Query(Request for Information) and query Responses',
                ui: 'soft-green',
                handler: 'showAddApplicationUnstrcuturedQueries',
            },{
                text: 'Submit Application',
                ui: 'soft-purple',
                hidden: true,
                iconCls: 'fa fa-check',
                name: 'process_submission_btn',
                table_name: 'tra_importexport_applications',
                winWidth: '50%'
            },
            {
                text: 'Next',
                ui: 'soft-purple',
                reference: 'nextbutton',
                iconCls: 'fa fa-arrow-right',
                iconAlign: 'right',max_step:2,
                bind: {
                    disabled: '{atEnd}'
                },wizard:'controldrugsimpevaluationpnl',
                handler: 'onNextScreeningCardClick'
            }
        ]
    };
    me.callParent(arguments);
}
});