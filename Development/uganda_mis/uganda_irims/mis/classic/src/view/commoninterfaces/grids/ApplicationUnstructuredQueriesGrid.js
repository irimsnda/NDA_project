Ext.define('Admin.view.commoninterfaces.grids.ApplicationUnstructuredQueriesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'applicationunstructuredqueriesgrid',
    itemId: 'applicationunstructuredqueriesgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    frame: true,
    width: '100%',
    height: 600,
    storeID: 'applicationunstructuredqueriesstr',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    tbar: [{
        xtype: 'button',
        text: 'Add Query',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_query',
        handler: 'showAddApplicationUnstrcuturedQueryForm',
        stores: '[]',
        bind: {
            hidden: '{isReadOnly}'
        }
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    }, {
        xtype: 'hiddenfield',
        name: 'application_id'
    }, {
        xtype: 'hiddenfield',
        name: 'module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'hiddenfield',
        name: 'item_resp_id'
    }, {
        xtype: 'hiddenfield',
        name: 'is_manager_query'
    }, {
        xtype: 'hiddenfield',
        name: 'is_manager_query_response'
    }, {
        xtype: 'hiddenfield',
        name: 'workflow_stage_id'
    }, {
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, '->', {
        xtype: 'displayfield',
        name: 'tracking_no',
        fieldLabel: 'Tracking No',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '12px'
        }
    }, {
        xtype: 'tbspacer',
        width: 20
    }, {
        xtype: 'displayfield',
        name: 'reference_no',
        fieldLabel: 'Ref No',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '12px'
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setCommonGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'applicationunstructuredqueriesstr',
               // groupField: 'query_type_id',
                proxy: {
                    url: 'getApplicationunstructuredqueries'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                is_manager_query = grid.down('hiddenfield[name=is_manager_query]').getValue(),
                is_manager_query_response = grid.down('hiddenfield[name=is_manager_query_response]').getValue(),
                respCol = grid.getColumnManager().getHeaderByDataIndex('last_response'),
                managerQryCol = grid.getColumnManager().getHeaderByDataIndex('manager_query_comment'),
                managerQryRespCol = grid.getColumnManager().getHeaderByDataIndex('manager_queryresp_comment');
            if (is_manager_query == 1 || is_manager_query === 1) {
                if (managerQryCol) {
                    managerQryCol.setHidden(false);
                }
            }
            if (is_manager_query_response == 1 || is_manager_query_response === 1) {
                if (managerQryRespCol) {
                    managerQryRespCol.setHidden(false);
                }
                if (respCol) {
                    respCol.setHidden(false);
                }
            }
            grid.columns[grid.columns.length - 1].widget.menu.items = [
                {
                    text: 'Edit Query',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    childXtype: 'applicationunstructuredqueriesfrm',
                    winTitle: 'Application Query',
                    winWidth: '35%',
                    handler: 'showEditApplicationQueryForm',
                    stores: '[]',
                    hidden: true
                }, {
                    text: 'Previous Responses',
                    iconCls: 'x-fa fa-exchange',
                    hidden: true,
                    disabled: true,
                    handler: 'showQueryPrevResponses',
                    stores: '[]'
                },{
                    text: 'View Query Responses',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Query Responses',
                    action: 'query_response',
                    childXtype: 'applicationqueryresponsepnl',
                    winTitle: 'Application Responses',
                    winWidth: '80%',document_type_id: 18,
                    handler: 'showEditApplicationQueryResponseForm',
                    stores: '[]',
                    hidden: true
                }, {
                    text: 'Add Comment',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Add Comment',
                    action: 'add_comment',
                    childXtype: 'applicationunstructuredqueriesfrm',
                    winTitle: 'Query',
                    winWidth: '35%',
                    handler: 'showEditApplicationUnstructuredQueryForm',
                    stores: '[]',
                    hidden: true
                }, {
                    text: 'Re-Query',
                    iconCls: 'x-fa fa-reply',
                    action: 're_query',
                    bind: {
                        hidden: '{isReadOnly}'
                    }, childXtype: 'applicationunstructuredqueriesfrm',
                    winTitle: 'Application Query',
                    handler: 'showReQueryApplicationQueryForm',
                    stores: '[]',
                    hidden: true
                },{
                    text: 'Delete Query',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'checklistitems_queries',
                    storeID: 'applicationunstructuredqueriesstr',
                    action_url: 'premiseregistration/deletePremiseRegRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteApplicationRegWidgetParam',
                   // disabled: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete'),
                    hidden: true
                }, {
                    text: 'Close Query',
                    iconCls: 'x-fa fa-check',
                    table_name: 'checklistitems_queries',
                    storeID: 'applicationunstructuredqueriesstr',
                    action: 'close_query',
                    
                    action_url: 'api/closeApplicationQuery',
                    handler: 'closeApplicationQuery',
                  //  hidden: true
                }];


        }
    },
    export_title: ' Analysis Test Results',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('applicationunstructuredqueriesgrid').fireEvent('refresh', this);
        }
    },'->',{
        text: 'Submit Query Details',
        ui: 'soft-red',
        iconCls: 'fa fa-check',
        name: 'query_submission_btn',
        storeID: 'commonuseregistrationstr',
        table_name: '',
        winWidth: '50%'
    },],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'checklist_querycategory',
        text: 'Query Category',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'query',
        text: 'Query',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'comment',
        text: 'Comment',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'queried_by',
        text: 'Queried By',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'queried_on',
        text: 'Queried On',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reference_details',hidden: true,
        text: 'Reference Details',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'last_response',
        text: 'Query Response',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'manager_query_comment',
        text: 'Manager Query Comment',
        tdCls: 'wrap',
        hidden: true,
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'manager_queryresp_comment',
        text: 'Manager Query Response Comment',
        tdCls: 'wrap',
        hidden: true,
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'query_status',
        text: 'Status',
        flex: 1,
        renderer: function (value, metaData, record) {
            var status_id = record.get('status');
            if (status_id === 1) {
                metaData.tdStyle = 'color:white;background-color:red';
                return value;
            }
			else if(status_id === 2){
				 metaData.tdStyle = 'color:white;background-color:blue';
            return value;
			}
			else{
				metaData.tdStyle = 'color:white;background-color:green';
                 value;
			}
            
        }

    }, {
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
            var status = rec.get('status'),
                grid = widget.up('grid'),
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                is_manager_query = grid.down('hiddenfield[name=is_manager_query]').getValue(),
                is_manager_query_response = grid.down('hiddenfield[name=is_manager_query_response]').getValue();
            if ((is_manager_query == 1 || is_manager_query === 1) || (is_manager_query_response == 1 || is_manager_query_response === 1)) {
                widget.down('menu menuitem[action=add_comment]').setVisible(true);
            } else {
                if ((isReadOnly) && isReadOnly > 0) {
                    //do nothing
                } else {
                    if (status === 1 || status == 1) {//open
                        widget.down('menu menuitem[action=actual_delete]').setVisible(true);
                        widget.down('menu menuitem[action=edit]').setVisible(true);
						widget.down('menu menuitem[action=query_response]').setVisible(false);
                       // widget.down('menu menuitem[action=re_query]').setVisible(false);
                       
                        if(is_manager_query){
                            //widget.down('menu menuitem[action=close_query]').setVisible(true);
                        }
                        else{
                           // widget.down('menu menuitem[action=close_query]').setVisible(false);
                        }
                    }
                    if (status === 2 || status == 2) {//responded
                        widget.down('menu menuitem[action=re_query]').setVisible(false);
                        //widget.down('menu menuitem[action=close_query]').setVisible(true);
                        widget.down('menu menuitem[action=query_response]').setVisible(true);
                        widget.down('menu menuitem[action=actual_delete]').setVisible(false);
                        widget.down('menu menuitem[action=edit]').setVisible(false);
                    }
                    if (status == 3 || status === 3) {//re queried
                        widget.down('menu menuitem[action=re_query]').setVisible(false);
						
						widget.down('menu menuitem[action=query_response]').setVisible(true);
						
                    }
                    if (status == 4 || status === 4) {//closed
                        widget.down('menu menuitem[action=re_query]').setVisible(false);
						
						widget.down('menu menuitem[action=query_response]').setVisible(true);
                        //widget.down('menu menuitem[action=close_query]').setVisible(false);
                    }
                }
            }
        }
    }]
});
