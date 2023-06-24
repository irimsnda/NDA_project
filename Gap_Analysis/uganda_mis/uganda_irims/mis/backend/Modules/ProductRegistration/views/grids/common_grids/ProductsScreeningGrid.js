/**
 * Created by Softclans
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductsScreeningGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ChecklistResponsesCmnGrid',
    xtype: 'productscreeninggrid',
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
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    },{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'combo',
        fieldLabel: 'Applicable Checklist',
        labelWidth: 150,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'applicable_checklist',
        queryMode: 'local',
        width: 500,
        labelStyle: "font-weight:bold",
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getProcessApplicableChecklistTypes'
                    }
                },
                isLoad: false
            },
            change: function () {
                var grid = this.up('grid'),
                    store = grid.getStore();
                    store.load();
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
    bbar: [{
        text: 'Checklist Revision(s)',
        ui: 'soft-green',
        iconCls: 'fa fa-history',
        name: 'show_screeninghistory_btn'
    },{
        xtype: 'pagingtoolbar',
        width: '50%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid=this.up('grid');
                grid.fireEvent('refresh', grid);
        }
    },'->',{
        text: 'Save Checklist Details',
        ui: 'soft-green',
        iconCls: 'fa fa-save',
        name: 'savegrid_screening_btn'
    },'->',{
        xtype: 'button',
        text: "Raise/View Query(Request for Information)",
        tooltip: 'Raise Query/View Query(Request for Information) and query Responses',
        ui: 'soft-green',
        name: 'raise_checklist_query',
        listeners: {
                click: function (btn) {
                    var grid = btn.up('grid');
                    grid.fireEvent('showAppQueries', grid);
                }
            }
    }]
});
