Ext.define('Admin.view.controldocument_management.views.panels.ControlDocumentsAccessManagementPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'controldocumentsaccessmanagementpnl',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    
 
    items: [{
            xtype:'form',
            region:'center',
            margin: '5px',
            width: '50%',
            layout:'form',
            listeners: {
                afterRender: 'loadDistributionDetailsForm'
            },
            items:[{
                xtype: 'hiddenfield',
                margin: '0 20 20 0',
                name: '_token',
                value: token,
                allowBlank: true
            }, {
                xtype: 'hiddenfield',
                fieldLabel: 'id',
                margin: '0 20 20 0',
                name: 'id',
                allowBlank: true
            }, {
                xtype: 'hiddenfield',
                value: 'tra_doccontrolaccess_management',
                margin: '0 20 20 0',
                name: 'table_name',
                allowBlank: true
            },{
                xtype: 'combo',
                fieldLabel: 'Directorate',
                margin: '0 20 20 0',
                name: 'directorate_id',
                allowBlank: false,
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_directorates'
                                }
                            }
                        },
                        isLoad: true
                    },change:'funcChangeDirectorates'
                }
            },{
                xtype: 'combo',
                fieldLabel: 'Directorate Units',
                margin: '0 20 20 0',
                name: 'directorate_unit_id',
                valueField: 'id',
                displayField: 'name',
                allowBlank: false,
                forceSelection: true,
                queryMode: 'local',//par_directorates
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_directorate_units'
                                }
                            }
                        },
                        isLoad: false
                    }
                }
            },{
                xtype: 'combo',
                fieldLabel: 'Type of Distribution',
                margin: '0 20 20 0',
                allowBlank: false,
                name: 'distribution_type_id',
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_documentdistribution_types'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change: "updateDistributionType"
                } 
            }],
           dockedItems:[
                {
                    xtype: 'toolbar',
                    ui: 'footer',
                    dock: 'bottom',
                    items:[
                        '->',{
                            text: 'Save Details',
                            formBind: true,
                            ui: 'soft-purple',
                            iconCls: 'x-fa fa-save',
                            text: 'Save Distribution Details',
                            handler: 'saveDistributionDetails'
                        }
                    ]
                }
            ],
    },{
        xtype: 'grid',
        region: 'east',
        margin: '5px',
        width: '50%',
        title: 'Document Access Personnels',
        viewConfig: {
            deferEmptyText: false,
            emptyText: 'Nothing to display',
        },
        tbar: [{
            xtype: 'button',
            text: 'Add',
            iconCls: 'x-fa fa-plus',
            action: 'add',
            ui: 'soft-green',
            childXtype: 'documentdistributionusersGrid',
            winTitle: 'Select User',
            winWidth: '40%',
            handler: 'showAddControlDocAccessManagement',//showAddConfigParamWinFrm
            stores: '[]'
        },{
            xtype: 'button',
            handler: 'clearDistributionList',
            ui: 'soft-red',
            text: 'Remove All',
            iconCls: 'x-fa fa-close'
        }],
        bbar: [{
            xtype: 'pagingtoolbar',
            width: '100%',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad: function () {
               var me = this,
                   mainTabPnl = me.up('#contentPanel'),
                   containerPnl = mainTabPnl.getActiveTab(),
                   store = me.getStore();
                   active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue();
            store.getProxy().extraParams = {application_id: active_application_id}
            }
        }],
        features: [{
            ftype: 'searching',
            minChars: 2,
            mode: 'local'
        }],
        listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'documentdistributionusersStr',
                proxy: {
                    url: 'controldocumentsmng/getDocumentDistributionUsersList',
                }
            },
            isLoad: true
        }
    },
    columns: [{
        header: 'Group',
        dataIndex:'name',
        flex:1
    },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            textAlign: 'left',
            xtype: 'button',
            iconCls: 'x-fa fa-close',
            ui: 'soft-red',
            text: 'Delete',
            handler: 'deleteDocumentDistributionUser'
        }
    }]
    }]
});