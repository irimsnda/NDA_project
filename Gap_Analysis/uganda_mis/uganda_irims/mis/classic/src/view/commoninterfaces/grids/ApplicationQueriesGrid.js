/**
 * Created by Softclans.
 */
Ext.define('Admin.view.commoninterfaces.grids.ApplicationQueriesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'applicationqueriesgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 400,
    frame: true,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var queryref_status_id = record.get('queryref_status_id');
            if (queryref_status_id == 0 || queryref_status_id === 0) {
                return 'valid-row';
            }
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add New Query Request',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_query',
        storeID: 'applicationqueriesstr',
        childXtype:'applicationRaiseQueryPnl', win_title: 'Add Application Queries(Request for Additional Information)',
        storeID: 'applicationqueriesstr',
        handler: 'showAddApplicationQueryForm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'hiddenfield',
        name: 'checklistquery_type_id'
    }, {
        xtype: 'hiddenfield',
        name: 'pass_status'
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
        name: 'application_code'
    }, {
        xtype: 'hiddenfield',
        name: 'workflow_stage_id'
    }, {
        xtype: 'hiddenfield',
        name: 'process_id'
    },{
        xtype: 'hiddenfield',
        name: 'is_manager_query'
    },{
        xtype: 'hiddenfield',
        name: 'is_manager_query_response'
    }],
   
    export_title: 'Queries',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.store,
                grid = this.up('grid'),
                module_id = grid.down('hiddenfield[name=module_id]').getValue(),
                sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
                section_id = grid.down('hiddenfield[name=section_id]').getValue(),
                application_code = grid.down('hiddenfield[name=application_code]').getValue(),
                process_id = grid.down('hiddenfield[name=process_id]').getValue(),
                workflow_stage_id = grid.down('hiddenfield[name=workflow_stage_id]').getValue();

            store.getProxy().extraParams = {
                module_id: module_id,
                sub_module_id: sub_module_id,
                section_id: section_id,
                application_code: application_code,
                process_id: process_id,
                workflow_stage_id: workflow_stage_id
            };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: 'Query Category: {[values.rows[0].data.checklist_category]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setCommonGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'applicationqueriesstr',
                proxy: {
                    url: 'api/getApplicationChecklistQueries'
                }
            },
            isLoad: true
        },
        afterrender: function (grid) {
            
             this.fireEvent('afterRenderAppqueriesgrid', grid);

        }
    },
    columns: [{
        xtype: 'rownumberer'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'query_ref',
        text: 'Query Ref No',
        tdCls:'wrap-text',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'checklist_category',
        text: 'Query Category',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'query_type',
        text: 'Query Type',
        width: 100,
        tdCls: 'wrap'
    }, {
        xtype: 'datecolumn',
        dataIndex: 'queried_on',
        text: 'Query Date',
        format: 'Y-m-d',
        width: 100,
        tdCls: 'wrap'
    }, {
        xtype: 'datecolumn',
        dataIndex: 'query_submission_date',
        text: 'Submission Date',
        format: 'Y-m-d',
        width: 100,
        tdCls: 'wrap'
    }, {
        xtype: 'datecolumn',
        dataIndex: 'responded_on',
        text: 'Response Date',
        format: 'Y-m-d',
        width: 100,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'query_remark',
        text: 'Remarks',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'status_id',
        text: 'Status',
        width: 100,
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "Open";
            }
            if (value == 2) {
                metaData.tdStyle = 'color:green;background-color:white';
                return "Responded";
            }
            if (value == 3) {
                metaData.tdStyle = 'color:white;background-color:gray';
                return "Re-Queried";
            }
            if (value == 4) {
                metaData.tdStyle = 'color:white;background-color:gray';
                return "Closed";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "Not Tracked";
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
            var status = rec.get('status_id'),
                grid = widget.up('grid'),
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && isReadOnly > 0) {
                //do nothing
            } else {
                if (status === 1 || status == 1) {//open
                    widget.down('menu menuitem[action=actual_delete]').setVisible(true);
                    widget.down('menu menuitem[action=edit]').setVisible(true);
                    widget.down('menu menuitem[action=re_query]').setVisible(false);
                    widget.down('menu menuitem[action=close_query]').setVisible(true);
                }
                if (status === 2 || status == 2) {//responded
                    widget.down('menu menuitem[action=re_query]').setVisible(true);
                    widget.down('menu menuitem[action=close_query]').setVisible(true);
                    widget.down('menu menuitem[action=actual_delete]').setVisible(false);
                    widget.down('menu menuitem[action=edit]').setVisible(false);
                }
                if (status == 3 || status === 3) {//re queried
                    widget.down('menu menuitem[action=re_query]').setVisible(false);
                }
                if (status == 4 || status === 4) {//closed
                    widget.down('menu menuitem[action=re_query]').setVisible(true);
                    widget.down('menu menuitem[action=close_query]').setVisible(false);
                    widget.down('menu menuitem[action=edit]').setVisible(false);
                }
            }
        }
    }],
     //plugin
     leadingBufferZone: 8,
     trailingBufferZone: 8,
    
    plugins: [{
        ptype: 'rowwidget',
            widget: {
                    xtype: 'panel',
                    bind: {
                        title: '{record.application_code}'
                    },header:false,
                    tbar:[{
                        xtype: 'hiddenfield',
                        name:'application_code',
                        bind: {
                            value: '{record.application_code}'
                        }
                    },{
                        xtype: 'hiddenfield',
                        name:'workflow_stage_id',
                        bind: {
                            value: '{record.workflow_stage_id}'
                        }
                    },{
                        xtype: 'hiddenfield',
                        name:'module_id',
                        bind: {
                            value: '{record.module_id}'
                        }
                    },{
                        xtype: 'hiddenfield',
                        name:'sub_module_id',
                        bind: {
                            value: '{record.sub_module_id}'
                        }
                    },{
                        xtype: 'hiddenfield',
                        name:'process_id',
                        bind: {
                            value: '{record.sub_module_id}'
                        }
                    },{
                        xtype: 'hiddenfield',
                        name:'section_id',
                        bind: {
                            value: '{record.sub_module_id}'
                        }
                    }],
                    items:[{
                        xtype:'grid',
                        height: 200,
                        width: '100%',
                        bind: {
                            title: '{record.application_code}'
                        },header:false,
                         autoLoad: true,
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
                        selType: 'cellmodel',
                        plugins: [{
                            ptype: 'gridexporter'
                        }, {
                            ptype: 'cellediting',
                            clicksToEdit: 1,
                            editing: true
                        },{
                            ptype: 'filterfield'
                        }],
                        export_title: 'Checklist',
                        features: [{
                            ftype: 'grouping',
                            startCollapsed: false,
                            groupHeaderTpl: '=> {[values.rows[0].data.checklist_type]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
                            hideGroupedHeader: true,
                            enableGroupingMenu: false
                        }],
                        listeners: {
                            afterrender: {
                                fn: 'setPremiseRegGridsStore',
                                config: {
                                    pageSize: 100,
                                    storeId: 'checklistitemsqueriesstr',
                                    groupField: 'checklist_type_id',
                                    proxy: {
                                        url: 'workflow/getProcessApplicableChecklistItems'
                                    }
                                },
                                isLoad: true
                            }
                        },
                        
                        columns: [{
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: 'Checklist Item/Category',
                            hidden: true,
                            tdCls: 'wrap-text', 
                            flex: 1
                        }, {
                            xtype: 'gridcolumn', 
                            tdCls: 'wrap-text',   
                            dataIndex: 'query',
                            text: 'Query/Observations', 
                            tdcls: 'editor-text',
                            flex: 1
                        }, {
                            xtype: 'gridcolumn', 
                            tdCls: 'wrap-text',   
                            dataIndex: 'query_response',
                            text: 'Query Response', 
                            tdcls: 'editor-text',
                            flex: 1,
                            renderer: function (value, metaData) {
                                if (value == 1) {
                                    return value;
                                }
                                else{
                                    return "No Response made."
                                }
                            }
                        },{
                            xtype: 'gridcolumn', 
                            tdCls: 'wrap-text',   
                            dataIndex: 'query_status_id',
                            text: 'Query Status', 
                            tdcls: 'editor-text',
                            flex: 0.2,
                            renderer: function (value, metaData) {
                                if (value == 1) {
                                    metaData.tdStyle = 'color:white;background-color:green';
                                    return "Open";
                                }
                                if (value == 2) {
                                    metaData.tdStyle = 'color:green;background-color:white';
                                    return "Responded";
                                }
                                if (value == 3) {
                                    metaData.tdStyle = 'color:white;background-color:gray';
                                    return "Re-Queried";
                                }
                                if (value == 4) {
                                    metaData.tdStyle = 'color:white;background-color:gray';
                                    return "Closed";
                                }
                                metaData.tdStyle = 'color:white;background-color:red';
                                return "Not Tracked";
                            }
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
                                    items: [{
                                        text: 'Edit',
                                        iconCls: 'x-fa fa-edit',
                                        handler: 'onEditApplicationsQuery',
                                        stores: '[]'
                                    }, {
                                        text: 'Close',
                                        iconCls: 'x-fa fa-edit',
                                        handler: 'onCloseApplicationsQuery',
                                        stores: '[]'
                                    }, {
                                        text: 'Delete',
                                        iconCls: 'x-fa fa-trash',
                                        //disabled: true,
                                        handler: 'onDeleteApplicationQueries',
                                        stores: '[]'
                                    }
                                    ]
                                }
                            }
                        }],
                        tbar:[{
                            text:'Add Query(Finding) Item',
                             ui: 'soft-green',
                             iconCls: 'x-fa fa-plus',
                             margin:5,
                             storeID: 'checklistitemsqueriesstr',
                             handler: 'showAddchecklistitemsqueriefrm',
                         },{
                            xtype: 'hiddenfield',
                            name:'is_structured',
                            bind: {
                                value: '{record.is_structured}'
                            }
                        },{
                            xtype: 'hiddenfield',
                            name:'query_id',
                            bind: {
                                value: '{record.query_id}'
                            }
                        }],
                        bbar: [{
                            xtype: 'pagingtoolbar',
                            width: '60%',
                            displayInfo: true,
                            displayMsg: 'Showing {0} - {1} of {2} total records',
                            emptyMsg: 'No Records',
                            hidden: true,
                            beforeLoad: function() {
                                var grid = this.up('grid'),
                                    store= grid.getStore(),
                                    is_structured = grid.down('hiddenfield[name=is_structured]').getValue(),
                                    query_id =  grid.down('hiddenfield[name=query_id]').getValue();

                                    store.removeAll();
                                    store.getProxy().extraParams = {
                                            query_id: query_id,
                                            is_structured: is_structured,
                                            pass_status: 2
                                    };
                            }
                        },'->']
                    }]
            }
        
    }]
});
