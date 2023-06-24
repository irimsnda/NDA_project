
Ext.define('Admin.view.importexportpermits.views.grids.DeclaredImportExportPermitsDashGrid', {
    extend: 'Admin.view.importexportpermits.views.grids.common_grids.PermitsDeclarationDashGrid',
    controller: 'importexportpermitsvctr',
    xtype: 'declaredimportexportpermitsdashgrid',
    itemId: 'declaredimportexportpermitsdashgrid',
    store: 'declaredimportexportpermitsstr',
    listeners:{
        beforerender:function(grid){
                grid.store.load();
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        store: 'declaredimportexportpermitsstr',//
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            
            this.up('declaredimportexportpermitsdashgrid').fireEvent('refresh', this);

        }
    }],
});