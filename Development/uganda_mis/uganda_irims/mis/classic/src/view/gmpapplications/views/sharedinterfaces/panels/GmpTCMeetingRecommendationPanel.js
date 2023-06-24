/**
 * Created by Kip on 5/13/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpTCMeetingRecommendationPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmptcmeetingrecommendationpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
   
    items: [
        {
            title: 'Meeting Details',
            region: 'north',
            height: 170,
            xtype: 'meetingdetailsfrm'
        },
        {
            title: 'Applications',
            region: 'center',
            xtype: 'gmptcmeetingrecommendationgrid'
        },{
            xtype: 'panel',
            layout:'accordion', region: 'west',
            width: 400,collapsed: false,
            titleCollapse: true,
            title:'Meeting Participants & Agendas',
            layout: {
                type: 'accordion',
                titleCollapse: false,
                animate: true,
                activeOnTop: true
            },
            items:[{
                title: 'Participants',
                xtype: 'tcmeetingparticipantsgrid',
                region: 'west',
                width: 400,
                collapsible: true,
                titleCollapse: true
            },{
                xtype: 'tcmeetingagendasgrid',
                title:'Agendas',
                 listeners: {
                    afterrender: function () {
                        var store = this.getStore();
                        store.removeAll();
                        store.load();
                    }
                },
                tbar: [
                    {
                        xtype: 'hiddenfield',
                        name: 'isReadOnly'
                    },
                    {
                        xtype: 'button',
                        text: 'Add',
                        name: 'add_agendas',
                        iconCls: 'x-fa fa-plus',
                        ui: 'soft-green',
                        hidden: true,
                        handler: 'showAddTcMeetingParticipants',
                        childXtype: 'tcmeetingagendasfrm',
                        storeId: 'tcmeetingagendasfrm',
                        winTitle: 'Meeting Agendas',
                        winWidth: '50%',
                        stores: '[]'
                    }
                ],
            }]

        }
        
    ]
    /*items: [
        {
            title: 'Document Uploads',
            region: 'center',
            layout: 'fit',
            items: [
                {
                    xtype: 'gmpappdocuploadsgenericgrid'
                }
            ]
        },
        {
            title: 'Product Line Details(TC Recommendation)',
            region: 'west',
            width: 600,
            collapsed: false,
            collapsible: true,
            titleCollapse: true,
            layout: 'fit',
            items: [
                {
                    xtype: 'productlinedetailstcrecommgrid'
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
            xtype: 'toolbar',
            ui: 'footer',
            region: 'south',
            height: 45,
            split: false,
            items: [
                {
                    xtype: 'transitionsbtn'
                },
                '->',
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
    ]
    */
});