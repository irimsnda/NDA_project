
Ext.define('Admin.view.importexportpermits.views.grids.food.CosmeticsImportExportPermitsDashGrid', {
    extend: 'Admin.view.importexportpermits.views.grids.common_grids.ImportExportPermitsDashGrid',
    controller: 'importexportpermitsvctr',
    xtype: 'cosmeticsimportexportpermitsdashgrid',
    itemId: 'cosmeticsimportexportpermitsdashgrid',
    store: 'cosmeticsimportexportpermitsstr',
    listeners:{
        beforerender:function(grid){
            grid.store.load();
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        store: 'cosmeticsimportexportpermitsstr',//
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            
            this.up('cosmeticsimportexportpermitsdashgrid').fireEvent('refresh', this);

        }
    }],
});