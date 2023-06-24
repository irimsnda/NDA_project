/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.PermitEvaluationChecklistsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ChecklistResponsesCmnGrid',
    xtype: 'permitevaluationchecklistsgrid',
    upload_tab: 'permitevaluationchecklistsgrid',
    table_name: 'tra_importexport_applications',
    viewModel: {
        type: 'importexportpermitsvm'
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid');
                grid.fireEvent('refresh', grid);
        }
    }],
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    }, {
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
        bind: {
            hidden: '{isReadOnly}'  // negated
        },
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
        labelStyle: "font-weight:bold"
    }],
});
