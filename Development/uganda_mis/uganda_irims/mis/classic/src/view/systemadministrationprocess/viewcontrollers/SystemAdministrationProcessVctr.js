Ext.define('Admin.view.systemadministrationprocess.viewcontrollers.SystemAdministrationProcessVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.systemadministrationprocessvctr',

    /**
     * Called when the view is created
     */
    init: function () {

    },
	
    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },
    funcClearFilters:function(btn){
        var grid = btn.up('grid'),
            store = grid.store;
        grid.down('datefield[name=changed_todate]').setValue('');
        grid.down('datefield[name=changed_fromdate]').setValue('');
        store.load();
    },
    setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },onChangeMarketAuthorisationRequest: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('onChangeMarketAuthorisationRequest', application_type);
    },
    onltrchangeRequest: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('onltrchangeRequest', application_type);
    },
    
    setConfigCombosSectionfilterStore: function (obj, options) {
        this.fireEvent('setConfigCombosStoreWithSectionFilter', obj, options);
    },

    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
    funcSearchTraderDetails:function(btn){
        var childXtype = btn.childXtype;
            child = Ext.widget(childXtype),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth;
            ismarketauthorisation = btn.ismarketauthorisation,
            child.setHeight(450);
            child.ismarketauthorisation = ismarketauthorisation;
            funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow'); 
    },
    funcApplicationOwnershipAmmendREq:function(btn){
        var childXtype = btn.childXtype;
            child = Ext.widget(childXtype),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth;
            child.setHeight(500);
            funcShowCustomizableWindow('Change Application Applicant Details', '60%', child, 'customizablewindow'); 
    },
    
    funcOnShowUpdateMarketAuthorisation:function(btn){
        var childXtype = btn.childXtype;
            child = Ext.widget(childXtype),
            mainTabPnl = btn.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth;
            

            var trader_id= activeTab.down('hiddenfield[name=trader_id]').getValue();
            var trader_name = activeTab.down('displayfield[name=trader_name]').getValue();

            child.down('hiddenfield[name=previous_trader_id]').setValue(trader_id);
            child.down('textfield[name=previous_marketauthorisation]').setValue(trader_name);
            funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow'); 

    },funcOnShowUpdateLocalTechnicalRep:function(btn){
        var childXtype = btn.childXtype;
            child = Ext.widget(childXtype),
            mainTabPnl = btn.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth;
            

            var trader_id= activeTab.down('hiddenfield[name=trader_id]').getValue();
            var trader_name = activeTab.down('displayfield[name=trader_name]').getValue();

            child.down('hiddenfield[name=trader_id]').setValue(trader_id);
            child.down('textfield[name=marketauthorisation_holder]').setValue(trader_name);
            funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow'); 
            
    }
    
});