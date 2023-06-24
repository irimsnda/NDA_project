
Ext.define('Admin.view.importexportpermits.views.grids.medicaldevices.MedicalDevImportExportPermitsDashGrid', {
    extend: 'Admin.view.importexportpermits.views.grids.common_grids.ImportExportPermitsDashGrid',
    controller: 'importexportpermitsvctr',
    xtype: 'medicaldevimportexportpermitsdashgrid',
    itemId: 'medicaldevimportexportpermitsdashgrid',
    store: 'medicaldevimportexportpermitsstr',
    listeners:{
        beforerender:function(grid){
                grid.store.load();
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        store: 'medicaldevimportexportpermitsstr',//
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            
            this.up('medicaldevimportexportpermitsdashgrid').fireEvent('refresh', this);

        }
    }],
});