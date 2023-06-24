Ext.define('Admin.view.managementdashboard.viewcontrollers.ManagementDashboardVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.managementdashboardVctr',
    ///the export option
    requires: [
        'Ext.exporter.text.CSV',
        'Ext.exporter.text.Html',
        'Ext.exporter.excel.Xlsx'
    ],

     setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },
     setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
    func_setStore: function(me,options){
      var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.common.CommonGridAbstractStore', config);
         me.setStore(store); 
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },
    //graphs
    onAxisLabelRender: function (axis, label, layoutContext) {
        var value = layoutContext.renderer(label);
        return value === 0 ? '0' : Ext.util.Format.number(value);
    },

    onSeriesLabelRender: function (value) {
        return Ext.util.Format.number(value);
    },

    onGridColumnRender: function (v) {
        return Ext.util.Format.number(v);
    },
    load_win: function(btn) {
        animateTarget: btn;
        var component =  Ext.widget('applicationDasboardReportPnl');

        funcShowCustomizableWindow('Administration Dashboard', '99%', component, 'customizablewindow');
    },
    func_filterdasboard: function(btn) {
        var productStore = Ext.getStore('ProductAppDashReportStr');
        Ext.getBody().mask('Filtering...');
        var panelStores=[productStore];
        var form = btn.up('form'),
            zone_id = form.down('combo[name=zone_id]').getValue(),
            section_id = form.down('combo[name=section_id]').getValue(),
            from_date = form.down('datefield[name=from_date]').getValue(),
            to_date = form.down('datefield[name=to_date]').getValue();

        var con = form.up('panel'),
            panels = con.down('dashboardRegistrationReportFrm');
            if(panels.down('applicationProductRepresentationPnl')){
            var product = panels.down('applicationProductRepresentationPnl'),
                premise = panels.down('applicationPremiseRepresentationPnl'),
                gmp = panels.down('applicationGmpRepresentationPnl'),
                IE = panels.down('applicationImportExportRepresentationPnl'),
                CT = panels.down('applicationClinicalTrialRepresentationPnl'),
//stores
                pstorec = product.down('cartesian').getStore(),
                pstoreg = product.down('gridpanel').getStore(),
                prestoreg = premise.down('gridpanel').getStore(),
                prestorec = premise.down('cartesian').getStore(),
                gstoreg = gmp.down('gridpanel').getStore(),
                gstorec = gmp.down('cartesian').getStore(),
                cstoreg = CT.down('gridpanel').getStore(),
                cstorec = CT.down('cartesian').getStore(),
                IEstoreg = IE.down('gridpanel').getStore(),
                IEstorec = IE.down('cartesian').getStore();
                panelStores.push(pstorec,pstoreg,prestoreg,prestorec,gstoreg,gstorec,cstoreg,cstorec,IEstoreg,IEstorec);
              } 
            var tabs = con.down('revenueApplicationRepresentationPnl');
            if(tabs.down('cartesian')){
                var revStore1 = Ext.getStore('ZonalAppDashRevenueReportStr'),
                    revStore2 = Ext.getStore('SectionRevenueAppDashReportStr');
                panelStores.push(revStore1,revStore2);
            }
            console.log(panelStores);
            Ext.each(panelStores, function(store) {
        // var store = Ext.getStore(eachStore);
            if(store){
              store.removeAll();
                store.reload({
                  params:{
                                zone_id: zone_id,
                                section_id: section_id,
                                from_date: from_date,
                                to_date: to_date

                        },
                  callback: function(records, operation, success) {
                          Ext.getBody().unmask();
                        }
                      });
            }
       })
    },
    funcFilterServiceCharterSummaryRpt:function(btn){
        var grid = btn.up('grid'),
            store = grid.store;
            store.load();

    },
    funcClearFilterServiceCharterSummaryRpt:function(btn){
        var grid = btn.up('grid'),
            form = btn.up('form'),
            store = grid.store;
            store.load();
            form.reset();
    },
    funcPrintServiceCharterSummaryRpt:function(btn){
        var grid = btn.up('grid'),
            form = btn.up('form'),
            form_values = form.getValues(),
            filterfield = grid.getPlugin('filterfield');
        form_values = convert_object(form_values);
             
        filter_array = Ext.pluck(filterfield.getgridFilters(grid), 'config');
        filter = Ext.JSON.encode(filter_array);	
        var action_url = 'reports/funcPrintServiceCharterSummaryRpt?type=2&filter=' + encodeURIComponent(filter) + form_values;
        print_report(action_url);
    },
    funcPrintServiceCharterSectionsSummaryRpt:function(btn){
        var grid = btn.up('grid'),
            form = btn.up('form'),
            form_values = form.getValues(),
            filterfield = grid.getPlugin('filterfield');
        form_values = convert_object(form_values);
             
        filter_array = Ext.pluck(filterfield.getgridFilters(grid), 'config');
        filter = Ext.JSON.encode(filter_array);	
        var action_url = 'reports/funcPrintServiceCharterSectionsSummaryRpt?type=2&filter=' + encodeURIComponent(filter) + form_values;
        print_report(action_url);
    },
    
    funcExportServiceCharterSummaryRpt:function(btn){
        var grid = btn.up('grid'),
            form = btn.up('form'),
            form_values = form.getValues(),
            filterfield = grid.getPlugin('filterfield');
        form_values = convert_object(form_values);
             
        filter_array = Ext.pluck(filterfield.getgridFilters(grid), 'config');
        filter = Ext.JSON.encode(filter_array);	
        var action_url = 'reports/funcExportServiceCharterSummaryRpt?type=2&filter=' + encodeURIComponent(filter) + form_values;
        print_report(action_url);
    },
    funcExportServiceCharterDetailedRpt:function(btn){
        var grid = btn.up('grid'),
            form = btn.up('form'),
            form_values = form.getValues(),
            filterfield = grid.getPlugin('filterfield');
        form_values = convert_object(form_values);
             
        filter_array = Ext.pluck(filterfield.getgridFilters(grid), 'config');
        filter = Ext.JSON.encode(filter_array);	
        var action_url = 'reports/funcExportServiceCharterDetailedRpt?type=2&filter=' + encodeURIComponent(filter) + form_values;
        print_report(action_url);
    },setProductRegGridsStore: function (obj, options) {
        this.fireEvent('setProductRegGridsStore', obj, options);
    },

    setProductRegCombosStore: function (obj, options) {
        this.fireEvent('setProductRegCombosStore', obj, options);
    },  setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },
});