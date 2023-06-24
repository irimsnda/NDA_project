/**
 * Created by Softclans on 5/23/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.AppDataAppealRequestsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'appdataappealrequestsabstractgrid',
    controller: 'commoninterfacesVctr',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    selModel: {
        selType: 'checkboxmodel'
    },
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    tbar: [{
        
        xtype: 'hiddenfield',
        name: 'is_manager_process'
    },{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },{
        xtype: 'hiddenfield',
        name: 'application_code'
    },{
        xtype: 'hiddenfield',
        name: 'application_id'
    },  {
        xtype: 'button',
        text: 'Add Request',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name:'add_request',
        winTitle: 'Data Appeal Request',
        childXtype: 'appdataappealrequestsfrm',//applicationvariationrequestsfrm
        winWidth: '50%',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    listeners: {
        beforerender: {
            fn: 'setCommonGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'appdataappealrequestsstr',
                proxy: {
                    url: 'api/getApplicationDataAppealRequests'
                }
            },
            isLoad: true
        },  afterrender: function () {
            var grid = this;
            
                grid.columns[grid.columns.length - 1].widget.menu.items = [
                    {
                        text: 'Edit',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit Record',
                        action: 'edit',
                        name:'add_request',
                        winTitle: 'Appeal Request',
                        childXtype: 'appdataappealrequestsfrm',
                        winWidth: '50%',
                        handler: 'showEditCommonParamParamWinFrm',//common view controller
                        stores: '[]'
                    },{
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'tra_application_appealdata',
                        storeID: 'appdataappealrequestsstr',
                        action_url: 'api/deleteCommonRecord',
                        action: 'actual_delete',
                        handler: 'doDeleteCommonParamWidgetParam',//common view controller
                        hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                    }];
        }
    },
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'appeal_type',
                text: 'Type of Appeal',
                flex: 1,
                tdCls: 'wrap'
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'appeal_request',
                text: 'Remarks',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'status',
                text: 'Status',
                flex: 1,
                hidden: true,
                tdCls: 'wrap'
            },{
                text: 'Options',
                xtype: 'widgetcolumn',
                width: 90,
                widget: {
                    width: 75,
                    textAlign: 'left',
                    xtype: 'splitbutton',
                    iconCls: 'x-fa fa-th-list',
                    ui: 'gray',
                    menu: {
                        xtype: 'menu',
                        items: []
                    }
                }, onWidgetAttach: function (col, widget, rec) {
                    var status = rec.get('status_id'),
                        grid = widget.up('grid');

                        widget.down('menu menuitem[action=actual_delete]').setVisible(true);
                        widget.down('menu menuitem[action=edit]').setVisible(true);

                }
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
