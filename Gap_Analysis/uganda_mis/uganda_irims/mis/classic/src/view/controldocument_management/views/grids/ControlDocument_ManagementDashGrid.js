
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.controldocument_management.views.grids.ControlDocument_ManagementDashGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'controldocumentmanagementvctr',
    xtype: 'controldocument_managementdashgrid',
    itemId: 'controldocument_managementdashgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
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
    store: 'controldocumentmanagementdashstr',
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    }, {
        xtype: 'combo',
        fieldLabel: 'Sub Module',
        labelWidth: 80,
        width: 320,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'sub_module_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getSystemSubModules',
                        extraParams: {
                            model_name: 'SubModule',
                            module_id: 18
                        }
                    }
                },
                isLoad: true
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }, {
        xtype: 'tbspacer',
        width: 10
    }, {
        xtype: 'combo',
        fieldLabel: 'Workflow Stage',
        valueField: 'id',
        name: 'workflow_stage_id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        width: 320,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setProductRegCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'workflow/getProcessWorkflowStages'
                    }
                },
                isLoad: false
            },
            change: 'reloadParentGridOnChange'
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Control Document applications',

    listeners: {
        itemdblclick: 'onViewControlDocumentApplication',
        afterrender:function(grid){
            grid.store.load();
        }
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: true,
       groupHeaderTpl: 'Process: {[values.rows[0].data.process_name]}, Stage: {[values.rows[0].data.workflow_stage]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
       
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        store: 'controldocumentmanagementdashstr',
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {

            this.up('controldocument_managementdashgrid').fireEvent('refresh', this);

        }
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Document Ref Number',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'document_type',
        text: 'Document Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'date_received',
        text: 'Application Date',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'process_name',
        text: 'Process',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        text: 'Prepared By',
        dataIndex: 'requested_byname',
        flex: 1,
        tdCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        text: 'Authorized By',
        dataIndex: 'approved_byname',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        text: 'Effective From',
        dataIndex: 'effective_date_from',
        flex: 1,renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        text: 'Next Review Date',
        dataIndex: 'next_review_date',
        flex: 1, renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        tdCls: 'wrap'
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
                items: [{
                    text: 'Preview Control Document',
                    iconCls: 'x-fa fa-file',
                    tooltip: ' Control Document',
                    action: 'edit',
                    childXtype: '',
                    winTitle: ' Control Document',
                    winWidth: '60%',
                    isReadOnly: 1,
                    document_type_id: '',
                    handler: 'showPreviousUploadedDocs'
                }
                ]
            }
        }
    }]
});
