/**
 * Created by Kip on 1/11/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpAppsForInspectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'gmpapplicationsvctr',
    xtype: 'gmpappsforinspectiongrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    appDetailsReadOnly: 1,
    frame: true,
    height: 550,
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
    selModel: {
        selType: 'checkboxmodel'
    },
    tbar: [
        {
            xtype: 'hiddenfield',
            name: 'inspection_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    table_name: 'tra_gmp_applications',
                    beforeLoad: function () {
                        var store = this.getStore(),
                            inspection_id = this.up('grid').down('hiddenfield[name=inspection_id]').getValue(),
                            section_id = this.up('grid').down('hiddenfield[name=section_id]').getValue();
                        store.getProxy().extraParams = {
                            inspection_id: inspection_id,
                            section_id: section_id,
                            table_name: 'tra_gmp_applications'
                        };
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Add Selected Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    winWidth: '50%',
                    handler: 'addGmpApplicationsIntoInspectionSchedule'
                }
            ]
        }
    ],
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'gmpapplications/getGmpApplicationsForInspection'
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_name',
        text: 'Premise Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'date_received',
        hidden: true,
        text: 'Date Received',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'gmp_type_txt',
        text: 'GMP Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'sub_module_name',
        text: 'Application Type',
        flex: 1
    }]
});
