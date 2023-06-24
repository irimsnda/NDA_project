
Ext.define('Admin.view.importexportpermits.views.grids.drugs.DrugsImportExportPermitsDashGrid', {
    extend: 'Admin.view.importexportpermits.views.grids.common_grids.ImportExportPermitsDashGrid',
    controller: 'importexportpermitsvctr',
    xtype: 'drugsimportexportpermitsdashgrid',
    itemId: 'drugsimportexportpermitsdashgrid',
    store: 'drugsimportexportpermitsstr',
    listeners:{
        beforerender:function(grid){
                grid.store.load();
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        store: 'drugsimportexportpermitsstr',//
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            
            this.up('drugsimportexportpermitsdashgrid').fireEvent('refresh', this);

        }
    }],
});