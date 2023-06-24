/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpInspectionReportsReviewGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.GmpManagersAbstractGrid',
    controller: 'gmpapplicationsvctr',
    xtype: 'gmpinspectionreportsreviewgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    appDetailsReadOnly: 1,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel'
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'combo',
        fieldLabel: 'GMP Type',
        valueField: 'id',
        name: 'gmp_type_id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        width: 300,
        labelWidth: 70,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setGmpApplicationCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        extraParams: {
                            model_name: 'GmpType'
                        }
                    }
                },
                isLoad: true
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
                    width: '60%',
                    table_name: 'tra_gmp_applications',
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    toaster: 0,
                    action: 'process_submission_btn',
                    winWidth: '50%'
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
            fn: 'setGmpApplicationGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'gmpapplications/getManagerApplicationsGeneric'
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
    columns: [
        {
            text: 'Inspection Type',
            dataIndex: 'inspection_type',
            flex: 1
        },
        {
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
                    items: [
                        {
                            text: 'Preview Details',
                            iconCls: 'x-fa fa-bars',
                            appDetailsReadOnly: 1,
                            handler: 'showGmpApplicationMoreDetails'
                        },
                        {
                            text: 'Inspection Reports/Documents',
                            iconCls: 'x-fa fa-folder',
                            childXtype: 'gmpappprevdocuploadsgenericgrid',
                            winTitle: 'Inspection Reports/Documents',
                            winWidth: '80%',
                            handler: 'showPreviousUploadedDocs',
                            target_stage: 'inspection'
                        },
                        {
                            text: 'Desk Review Reports/Documents',
                            iconCls: 'x-fa fa-folder',
                            childXtype: 'gmpappprevdocuploadsgenericgrid',
                            winTitle: 'Desk Review Reports/Documents',
                            winWidth: '80%',
                            handler: 'showPreviousUploadedDocs',
                            target_stage: 'deskreviewprocess'
                        },
                        {
                            text: 'Dismiss/Cancel Application',
                            iconCls: 'x-fa fa-thumbs-down',
                            handler: 'showApplicationDismissalForm'
                        }
                    ]
                }
            },onWidgetAttach: function (col, widget, rec) {
                var inspection_type = rec.get('inspection_type_id');
                if (inspection_type === 2 || inspection_type == 3) {//Desk review
                    widget.down('menu menuitem[target_stage=deskreviewprocess]').setVisible(true);
                    widget.down('menu menuitem[target_stage=inspection]').setVisible(false);
                } else {
                    widget.down('menu menuitem[target_stage=deskreviewprocess]').setVisible(false);
                    widget.down('menu menuitem[target_stage=inspection]').setVisible(true);
                }
            }
        }]
});
