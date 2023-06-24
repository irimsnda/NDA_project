/**
 * Created by Kip on 12/30/2018.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpProvisionalInspectionPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmpprovisionalinspectionpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [
        {
            title: 'Manufacturing Site Inspection Process',
            region: 'center',
            xtype:'tabpanel',
            layout: 'fit',
            items: [ {
                    xtype: 'gmpscreeninggrid',
                    title: 'Provisional Inspection Checklist',
                    
                },
                {
                    xtype: 'gmpappdocuploadsgenericgrid',
                    title: 'Provisional Upload Report'
                }, {
                    xtype: 'productlinedetailsinspectiongrid',
                    title: 'Manufacturing Site Product Line Details Recommendations',
                }
            ]
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
                        }
                    ]
                }
            ]
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
               
                {
                    text: 'Documents/Reports',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-upload',
                    childXtype: 'gmpappdocuploadsgenericgrid',
                    winTitle: 'Inspection Documents',
                    winWidth: '80%',
                    name: 'docs_btn',
                    hidden: true,
                    stores: '[]',
                    isWin: 1
                },{
                    text: 'Preview & Edit Details',
                    iconCls: 'fa fa-bars',
                    name: 'more_app_details',
                    isReadOnly: 0,
                    is_temporal: 0
                },
                
                
                '->',
                {
                    text: 'Save Inspection Details(Checklist)',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    
                }, {
                    text: 'Overrall Comments and recommendation',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-weixin',
                    childXtype: 'applicationcommentspnl',
                    winTitle: 'Inspection Comments',
                    winWidth: '60%',
                    name: 'comments_btn',
                    comment_type_id: 1,
                    stores: '[]'
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    table_name: 'tra_gmp_applications',
                    winWidth: '50%'
                }
            ]
        }
    ]
});