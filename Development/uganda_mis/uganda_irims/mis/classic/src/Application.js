Ext.define('Admin.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Admin',

    requires: ['Admin.view.plugins.Badge','Admin.view.plugins.CKeditor'],
    stores: [
        'ConfirmationStr'
    ],
    
    controllers:[
        'SharedUtilitiesCtr',
        'AdministrationCtr',
        'DashboardCtr',
        'UserManagementCtr',
        'ParametersCtr',
        'OrganisationConfigCtr',
        'WorkflowManagementCtr',
        'PremiseRegistrationCtr',
        'ProductRegistrationCtr',
        'ProductRecallAlertCtr',
        'ConfigurationsCtr',
       // 'premiseregistration.DrugsPremiseCtr',
       // 'premiseregistration.FoodPremiseCtr',
       // 'premiseregistration.CosmeticsPremiseCtr',
       // 'premiseregistration.MedDevicesPremiseCtr',
        'GmpApplicationsCtr',
        'ClinicalTrialCtr',
        'ReportsCtr',
        'SurveillanceCtr',
        'ImportExportpermitsCtr',
        'ProductNotificationsCtr',
		'PromoAndAdvertMaterialsController',
        'ProfileCtr',
        'OpenOfficeCtr',
        'OnlineServicesCtr',
        'RevenueManagementCtr',
        'SystemAdministrationProcessCtr',
        'DocumentContolManCtr',
        'PvCtr'
    ],
    defaultToken : 'dashboard',

    // The name of the initial view to create. This class will gain a "viewport" plugin
    // if it does not extend Ext.Viewport.
    //
    //mainView: 'Admin.view.main.Main',

    launch: function () {
        //If user is logged in open 'app-main' else open 'login'
        Ext.create({
            xtype: (is_logged_in) ? 'main-app' : ((is_reset_pwd) ? 'resetpwdscreen' : 'login')
        });
        if(is_logged_in){

            checkUserSessionValidity(800000);
            setupTimers();
            var usersstr = Ext.getStore('usersstr'),
            gmpproductlinestatusstr  = Ext.getStore('gmpproductlinestatusstr'),
            confirmationstr = Ext.getStore('confirmationstr'),
            navigationstr = Ext.getStore('navigationstr');

            usersstr.load();
            gmpproductlinestatusstr.load();
            navigationstr.load();
            confirmationstr.load();
        }
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
