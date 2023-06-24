/**
 * Created by Kip on 10/19/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.OnlineImportExportAppsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'onlineimportexportappsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    wizard_pnl:'importexportonlinereceivingwizard',
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
                            module_id: 4
                        }
                    }
                },
                isLoad: true
            },
            change: function () {
                var grid = this.up('grid');
                grid.getStore().load();
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
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Online Product applications',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
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
        groupHeaderTpl: 'Sub-Module: {[values.rows[0].data.sub_module]} [{rows.length} {[values.rows.length > 1 ? "Applications" : "Application"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'onlineimportexportappsstr',
               groupField:'sub_module',
                proxy: {
                    url: 'importexportpermits/getonlineimportexportappdetails'
                }
            },
            isLoad: true
        },
        itemdblclick: 'previewOnlineApplication'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'zone_name',
        text: 'Zone Name',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'sub_module',
        text: 'Sub Module',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'proforma_invoice_no',
        text: 'Proforma Invoice No',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'proforma_invoice_date',
        text: 'Proforma Invoice Date',
        tdCls: 'wrap',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'permit_category',
        text: 'permit Category',
        tdCls: 'wrap',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Application Status',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'submission_date',
        text: 'Submitted On',
        flex: 1,
        tdCls: 'wrap',
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
    }]
});
