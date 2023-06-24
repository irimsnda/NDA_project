
Ext.define('Admin.view.importexportpermits.views.grids.food.FoodImportExportPermitsDashGrid', {
    extend: 'Admin.view.importexportpermits.views.grids.common_grids.ImportExportPermitsDashGrid',
    controller: 'importexportpermitsvctr',
    xtype: 'foodimportexportpermitsdashgrid',
    itemId: 'foodimportexportpermitsdashgrid',
    store: 'foodimportexportpermitsstr',
    listeners:{
        beforerender:function(grid){
                grid.store.load();
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        store: 'foodimportexportpermitsstr',//
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            
            this.up('foodimportexportpermitsdashgrid').fireEvent('refresh', this);

        }
    }],
});