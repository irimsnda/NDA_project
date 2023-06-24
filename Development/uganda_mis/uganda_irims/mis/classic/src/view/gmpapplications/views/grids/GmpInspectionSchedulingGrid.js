/**
 * Created by Kip on 5/11/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpInspectionSchedulingGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.GmpManagersAbstractGrid',
    controller: 'gmpapplicationsvctr',
    xtype: 'gmpinspectionschedulinggrid',
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
        }
      /*  listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }*/
    },
    selModel: {
        selType: 'checkboxmodel'
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'button',
        text: 'Inspection Cateorisation',
        disabled: true,
        name: 'categorize_selected',
        ui: 'soft-green',
        iconCls: 'x-fa fa-bars',
        menu: {
            xtype: 'menu',
            items: [
                {
                    text: 'Physical Inspection',
                    iconCls: 'x-fa fa-check',
                    inspection_type_id: 1,
                    handler: 'categorizeGmpApplications'
                },
                {
                    text: 'Desk Review',
                    iconCls: 'x-fa fa-check',
                    inspection_type_id: 2,
                    handler: 'categorizeGmpApplications'
                },
                {
                    text: 'Virtual Inspection',
                    iconCls: 'x-fa fa-check',
                    inspection_type_id: 3,
                    handler: 'categorizeGmpApplications'
                }
            ]
        }
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
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            table_name: 'tra_gmp_applications',
            beforeLoad: function () {
                this.up('grid').fireEvent('refresh', this);
            }
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
                grid.down('button[name=categorize_selected]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=categorize_selected]').setDisabled(true);
            }
        }
    },
    columns: [
        {
            text: 'Inspection Type',
            dataIndex: 'inspection_type',
            flex: 1
        },{
			text: 'GMP Categorisation',
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
							text: 'Physical Inspection',
							iconCls: 'x-fa fa-check',
							inspection_type_id: 1,
							handler: 'singlecategorizeGmpApplications'
						},
						{
							text: 'Desk Review',
							iconCls: 'x-fa fa-check',
							inspection_type_id: 2,
							handler: 'categorizeGmpApplications'
						}]
						
						
				}
			}
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
                        appDetailsReadOnly: 0,
                        handler: 'showGmpApplicationMoreDetails'
                    },
                    {
                        text: 'SMF Uploads',
                        iconCls: 'x-fa fa-folder',
                        childXtype: 'gmpappprevdocuploadsgenericgrid',
                        winTitle: 'SMF Uploads',
                        winWidth: '80%',
                        handler: 'showPreviousUploadedDocs',
                        target_stage: 'smfuploads'
                    },
                    {
                        text: 'Dismiss/Cancel Application',
                        iconCls: 'x-fa fa-thumbs-down',
                        handler: 'showApplicationDismissalForm'
                    }
                ]
            }
        }
    }]
});
