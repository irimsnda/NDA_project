/**
 * Created by Softclans on 5/23/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.AppDataAmmendmentRequestsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'appdataammendmentrequestsabstractgrid',
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
    }, {
        xtype: 'hiddenfield',
        name: 'appdata_ammendementrequest_id'
    },  {
        xtype: 'button',
        text: 'Add Request',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name:'add_request',
        winTitle: 'Data Amendment Request',
        childXtype: 'appdataammendmentrequestfrm',//applicationvariationrequestsfrm
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
                storeId: 'appdataammendmentrequeststr',
                proxy: {
                    url: 'api/getApplicationDataAmmendmentRequests'
                }
            },
            isLoad: true
        },  afterrender: function () {
            var grid = this,
            is_manager_process = grid.down('hiddenfield[name=is_manager_process]').getValue();
            if ((is_manager_process) && is_manager_process > 0) {
                grid.columns[grid.columns.length - 1].widget.menu.items = [
                    {
                        text: 'Approve Ammendment',
                        iconCls: 'x-fa fa-check',
                        table_name: 'checklistitems_queries',
                        storeID: 'applicationqueriesstr',
                        action: 'approve_ammendment',
                        status_id: 2,title:'Approve the Ammendment Request',
                        action_url: 'api/appDataAmmendmentStatusUpdate',
                        handler: 'appDataAmmendmentStatusUpdate'
                    }, {
                        text: 'Reject Ammendment',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Reject Ammendment',
                        winWidth: '35%', 
                        status_id: 2,
                        action_url: 'api/appDataAmmendmentStatusUpdate',
                        title:'Reject the Ammendment Request',
                        handler: 'appDataAmmendmentStatusUpdate',
                        stores: '[]'
                    }];
                    
            } else {
                grid.columns[grid.columns.length - 1].widget.menu.items = [
                    {
                        text: 'Edit',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit Record',
                        action: 'edit',
                        name:'add_request',
                        winTitle: 'Amendment Request',
                        childXtype: 'appdataammendmentrequestfrm',
                        winWidth: '50%',
                        handler: 'showEditCommonParamParamWinFrm',//common view controller
                        stores: '[]'
                    },{
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'tra_appsections_ammendments',
                        storeID: 'appdataammendmentrequeststr',
                        action_url: 'api/deleteCommonRecord',
                        action: 'actual_delete',
                        handler: 'doDeleteCommonParamWidgetParam',//common view controller
                        hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                    }];
            }
        }
    },
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'application_section',
                text: 'Application Section',
                flex: 1,
                tdCls: 'wrap'
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'remarks',
                text: 'Remarks',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'status',
                text: 'Status',
                flex: 1,
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
                        grid = widget.up('grid'),
                        is_manager_process = grid.down('hiddenfield[name=is_manager_process]').getValue();
                    if ((is_manager_process) && is_manager_process > 0) {
                        if (status === 1 || status == 1) {//open
                            widget.down('menu menuitem[action=approve_ammendment]').setVisible(false);
                            widget.down('menu menuitem[action=reject_ammendment]').setVisible(false);
                        }
                        if (status === 2 || status == 2) {//responded
                            //widget.down('menu menuitem[action=re_query]').setVisible(true);
                            widget.down('menu menuitem[action=reject_ammendment]').setVisible(true);
                        }
                        if (status == 4 || status === 4) {//closed
                            widget.down('menu menuitem[action=approve_ammendment]').setVisible(true);
                        }
                    } else {
                        if (status === 1 || status == 1) {//open
                            widget.down('menu menuitem[action=actual_delete]').setVisible(true);
                            widget.down('menu menuitem[action=edit]').setVisible(true);
                        }
                        else{
                            widget.down('menu menuitem[action=actual_delete]').setVisible(false);
                            widget.down('menu menuitem[action=edit]').setVisible(false)
                            widget.down('menu menuitem[action=approve_ammendment]').setVisible(false);
                            widget.down('menu menuitem[action=reject_ammendment]').setVisible(false);
                        }
                        if (status === 2 || status == 2) {//responded
                            //widget.down('menu menuitem[action=re_query]').setVisible(true);
                            widget.down('menu menuitem[action=close_ammendment]').setVisible(true);
                           
                        }
                    }
                }
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
