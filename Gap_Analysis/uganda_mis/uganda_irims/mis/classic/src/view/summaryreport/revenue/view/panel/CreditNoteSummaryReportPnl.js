Ext.define('Admin.view.summaryreport.revenue.view.panel.CreditNoteSummaryReportPnl', {
    extend: 'Ext.tab.Panel',
    controller: 'revenueReportViewCtr',
    xtype: 'creditnotesummaryreportpnl',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',

    //filters
    tbar: [
        {
            xtype: 'form',
            ui: 'footer',
            width: '100%',
            layout:{
                type:'column',
                columns:5
            },
            defaults:{
                margin:2,
                labelAlign:'top',
                columnWidth: 0.2
            },
            items: [
               {
                   xtype:'datefield',
                   name: 'requested_from',
                   format: 'Y-m-d',
                    fieldLabel: 'Requested From'
                }, {
                    xtype:'datefield',
                    name: 'requested_to',
                    format: 'Y-m-d',
                    fieldLabel: 'Requested To'
                }, {
                    xtype:'combo',
                    queryMode: 'local',
                    forceSelection: true,
                    name: 'requested_by',
                    valueField:'id',
                    displayField:'name',
                    fieldLabel: 'Requested By',
                    listeners: {
                        beforerender: {
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'usermanagement/getUserList',
                                }
                            },
                            isLoad: true
                        }
                    }
                }, {
                    xtype:'datefield',
                    name: 'approved_from',
                    format: 'Y-m-d',
                     fieldLabel: 'Approved From'
                 }, {
                     xtype:'datefield',
                     name: 'approved_to',
                     format: 'Y-m-d',
                     fieldLabel: 'Approved To'
                 }, {
                    xtype:'combo',
                    queryMode: 'local',
                    forceSelection: true,
                    name: 'approved_by',
                    valueField:'id',
                    displayField:'name',
                    fieldLabel: 'Approved By ',
                    listeners: {
                        beforerender: {
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'usermanagement/getUserList',
                                }
                            },
                            isLoad: true
                        }
                    }
                }
            ],
            buttons:[{
                text: 'Filter Credit Note',
                iconCls:'x-fa fa-search',
                handler: 'funcFilterCreditNoteReport'
            },{
                text: 'Export Credit Note',
                iconCls:'x-fa fa-print',
                handler: 'funcExportCreditNoteReport'
            },{
                text: 'Clear Filter',
                iconCls:'x-fa fa-cancel',
                ui: 'soft-red',
                handler: 'funcClearFilter'
            }]
        }
    ],


    //tabs
    items:[{
        xtype: 'requestedcreditnotesummaryreportgrid',
        title: 'Requested Credit Notes'
    }, {
            xtype: 'approvedcreditnotesummaryreportgrid',
            title: 'Approved Credit Notes'
        }],
    
});
