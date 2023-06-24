/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.DrugsSurveillanceGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'surveillancevctr',
    xtype: 'drugssurveillancegrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        enableTextSelection: true,
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
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
                        url:'workflow/getSystemSubModules',
                        extraParams: {
                            model_name: 'SubModule',
                            module_id: 5
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
                fn: 'setWorkflowCombosStore',
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
    export_title: 'Surveillance applications',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        store: 'drugssurveillancestr',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    }],
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
    }],
    listeners: {
        beforerender: function () {
            var store = this.store;
            store.removeAll();
            store.load();
        },
        itemdblclick: 'onViewSurveillanceApplication'
    },
    store: 'drugssurveillancestr',
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        hidden: true,
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'process_name',
        text: 'Process',
        flex: 1,
        tdCls: 'wrap',
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'zone',
        text: 'Zone',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'directorate',
        text: 'Directorate',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'sample_site',
        text: 'Sample Collection Site',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'workflow_stage',
        text: 'Workflow Stage',
        flex: 1,
        tdCls: 'wrap',
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Application Status',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'analysis_statuses',
        text: 'Analysis Status',
        flex: 1,
        tdCls: 'wrap'
    }]
});
